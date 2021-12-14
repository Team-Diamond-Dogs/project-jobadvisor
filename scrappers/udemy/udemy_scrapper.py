"""
Web scrapper for the Udemy course catalog. To use it, invoke the script from the command line, passing the
search term wrapped in double quotes.

Usage: $> python udemy_scrapper.py "My search terms"

"""

import os
import pandas as pd
import sys
import time
import urllib

from sqlalchemy.sql.expression import text
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from sqlalchemy import create_engine

def get_database_engine():
    db_user = os.getenv("MYSQL_USER")
    db_pass = os.getenv("MYSQL_PASSWORD")
    db_host = os.getenv("MYSQL_HOST")
    db_port = os.getenv("MYSQL_PORT")
    db_name = os.getenv("MYSQL_DATABASE")
    return create_engine("mysql+pymysql://{}:{}@{}:{}/{}".format(db_user, db_pass, db_host, db_port, db_name), echo=False)

def get_tag_id(name, engine):
    with engine.connect() as conn:
        try:
            stmt = text("SELECT id FROM tags WHERE name = :name")
            rst = conn.execute(stmt, { "name": name })
            return rst.first()["id"]
        except Exception:
            return None

def get_data(search_terms, headless_mode=True):
    
    db_engine = get_database_engine()
    tag_id = get_tag_id(search_terms, db_engine)
    
    if tag_id is None:
        print("No existe registro en la tabla `tags` para el término %s" % search_terms)
        return
    
    search_terms_sanitized = urllib.parse.quote_plus(search_terms)
    url = f"https://www.udemy.com/courses/search/?src=ukw&q={search_terms_sanitized}"
    
    # Create a Chrome driver in headless mode
    service = Service("D://Tools//chromedriver.exe")  # TODO: change me
    options = webdriver.ChromeOptions()
    options.add_argument("--window-size=1920,1080")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    options.add_argument("--disable-blink-features=AutomationControlled")

    if headless_mode:
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        
    
    print("Starting a web session for the URL:", url)
    wd = webdriver.Chrome(service=service, options=options)
    wd.get(url)
    # Wait for the UI to load the list of courses
    time.sleep(5)
    
    # Scroll to the end of the page to activate lazy loading for images
    height = wd.execute_script("return document.body.scrollHeight")
    for i in range(int(height / 100)):
        wd.execute_script("window.scrollTo(0, %d);" % int((i+1) * 100))
    
    courses_list = wd.find_elements(By.CSS_SELECTOR, ".course-list--container--3zXPS .browse-course-card--link--3KIkQ")
    if len(courses_list) == 0:
        print("No se encontraron cursos en la página consultada")
        return
    
    recommended_courses = []
    
    for course in courses_list:
        name = course.find_element(By.CSS_SELECTOR, ".course-card--course-title--vVEjC").get_attribute("innerText")
        course_url = course.get_attribute("href")
        thumb_url = course.find_element(By.CSS_SELECTOR, "img.course-card--course-image--3QvbQ").get_attribute("src")
        recommended_courses.append({ "tag_id": tag_id, "name": name, "url": course_url, "thumbnail_url": thumb_url, "platform": "udemy" })
        
    courses_df = pd.DataFrame(recommended_courses)
    courses_df.to_sql("tag_courses", con=db_engine, if_exists="append", index=False)
    
    # Close the web browser instance
    wd.quit()


if __name__ == "__main__":
    try:
        load_dotenv()
        search_terms = sys.argv[1]
        get_data(search_terms, False)
    except Exception as e:
        print("Ocurrio un error al ejecutar el scrapper. %s" % str(e) )