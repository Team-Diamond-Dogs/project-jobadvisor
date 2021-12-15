"""
Script that loads courses recommended for each concept in the tags table from the database.
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

def get_tags_from_database(engine):
    tags = []
    with engine.connect() as conn:
        try:
            stmt = text("SELECT name FROM tags WHERE is_skill = 1")
            rst = conn.execute(stmt)
            
            for row in rst:
                tags.append(row["name"])
        except Exception:
            return None
    
    return tags

def load_tags():
    db_engine = get_database_engine()
    tags = get_tags_from_database(db_engine)
    print("tags ", len(tags))
    
    for tag in tags:
        print("Cargando cursos para el tag %s" % tag)
        os.system('python ../../scrappers/udemy/udemy_scrapper.py "{}"'.format(tag))


if __name__ == "__main__":
    load_dotenv()
    load_tags()