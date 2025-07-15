import os
import pandas as pd
import urllib
from django.conf import settings
from django.db import connection
from sqlalchemy import create_engine
import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)


try:
    params = urllib.parse.quote_plus(r'Driver={0};Server=tcp:{1},{2};Database={3};Uid={4};Pwd={5};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'.format(
                                                                    settings.DATABASES['default']['OPTIONS']['Driver'],
                                                                    settings.DATABASES['default']['HOST'],
                                                                    settings.DATABASES['default']['PORT'],
                                                                    settings.DATABASES['default']['NAME'],
                                                                    settings.DATABASES['default']['USER'],
                                                                    settings.DATABASES['default']['PASSWORD']))
    conn_str = 'mssql+pyodbc:///?odbc_connect={}'.format(params)
    engine_azure = create_engine(conn_str,echo=True)
except:
    engine_azure = None

def get_db_connection():
    if engine_azure:
        return engine_azure.connect()
    else:
        return connection

