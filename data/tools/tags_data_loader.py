"""
Script that loads Tag data from Get On Board's API to the database.
"""

import os
import pandas as pd
import requests
from sqlalchemy import create_engine
from sqlalchemy.sql.expression import text
from dotenv import load_dotenv


def get_database_engine():
    db_user = os.getenv("MYSQL_USER")
    db_pass = os.getenv("MYSQL_PASSWORD")
    db_host = os.getenv("MYSQL_HOST")
    db_port = os.getenv("MYSQL_PORT")
    db_name = os.getenv("MYSQL_DATABASE")
    return create_engine("mysql+pymysql://{}:{}@{}:{}/{}".format(db_user, db_pass, db_host, db_port, db_name), echo=False)

def get_tags_from_api():
    tags = []
    page = 1
    per_page = 100
    while True:
        api_url = f"https://www.getonbrd.com/api/v0/tags?per_page={per_page}&page={page}"
        print("Leyendo página %s" % page)
        print(api_url)
        req = requests.get(api_url)
        if req.status_code != 200:
            break
        
        data = req.json()["data"]
        print("Obtenidos %s registros" % len(data))
        for tag in data:
            tags.append({ "name": tag["attributes"]["name"], "value": tag["id"], "keywords": tag["attributes"]["keywords"] })
        
        if len(data) < per_page:
            break
        
        page += 1
        
    return tags

def load_tags():
    db_engine = get_database_engine()
    tags = get_tags_from_api()
    tags_df = pd.DataFrame(tags)
    tags_df.to_sql("tags", con=db_engine, if_exists="append", index=False)


if __name__ == "__main__":
    load_dotenv()
    load_tags()