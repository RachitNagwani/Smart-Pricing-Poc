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
    
    def create_scenario(name, description, type, market):
        try:
            Session = sessionmaker(bind=get_db_connection())
            session = Session()
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            create_mapping_query = text(create_scenario_query(name, description, type, now, market))
            session.execute(create_mapping_query)
            session.commit()
        except Exception as e:
            return False
        return True
    
    def update_scenario(scenario_id, name, market):
        Session = sessionmaker(bind=get_db_connection())
        session = Session()
        create_mapping_query = text(update_scenario_query(scenario_id, name, market))
        session.execute(create_mapping_query)
        session.commit()
    
    def delete_scenario(scenario_id, market):
        Session = sessionmaker(bind=get_db_connection())
        session = Session()
        create_mapping_query = text(delete_scenario_query(scenario_id, market))
        session.execute(create_mapping_query)
        session.commit()

    def get_scenario(scenario_id, market):
        try:
            db_connection = get_db_connection()
            query, params = get_scenario_query(scenario_id, market)
            scenario_df = pd.read_sql(query,db_connection, params=params)
        finally:
            db_connection.close()
        return scenario_df
