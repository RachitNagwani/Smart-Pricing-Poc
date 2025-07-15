import pandas as pd
from api.db_connection import get_db_connection
from api.query import get_scenarios_query, create_scenario_query, update_scenario_query, delete_scenario_query, get_scenario_query
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from datetime import datetime


class ScenarioRepository:
    def get_scenarios(market):
        try:
            db_connection = get_db_connection()
            query, params = get_scenarios_query(market)
            scenario_df = pd.read_sql(query,db_connection, params=params)
        finally:
            db_connection.close()
        return scenario_df
    
    def create_scenario(name, description, type, market, user):
        try:
            Session = sessionmaker(bind=get_db_connection())
            session = Session()
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            query, params = create_scenario_query(name, description, type, now, market, user)
            session.execute(text(query), params)
            session.commit()
        except Exception as e:
            print(e)
            return False
        return True
    
    def update_scenario(scenario_id, name, description, type, market, user):
        try:
            Session = sessionmaker(bind=get_db_connection())
            session = Session()
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            query, params = update_scenario_query(scenario_id, name, description, type, market, user, now)
            session.execute(text(query), params)
            session.commit()
        except Exception as e:
            print(e)
            return False
        return True
    
    def delete_scenario(scenario_id, market, user):
        try:
            Session = sessionmaker(bind=get_db_connection())
            session = Session()
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            query, params = delete_scenario_query(scenario_id, market, user, now)
            session.execute(text(query), params)
            session.commit()
        except Exception as e:
            return False
        return True

    def get_scenario(scenario_id, market):
        try:
            db_connection = get_db_connection()
            query, params = get_scenario_query(scenario_id, market)
            scenario_df = pd.read_sql(query,db_connection, params=params)
        finally:
            db_connection.close()
        return scenario_df
