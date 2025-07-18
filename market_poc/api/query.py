from api.constants import ACTIVE, INACTIVE
from sqlalchemy import text


def get_scenarios_query(market):
    query_string = f"""
                    SELECT * FROM {market}.scenario_master WHERE is_active=?;"""
    params = [ACTIVE]
    return query_string, tuple(params)

def create_scenario_query(name, description, type, now, market, user):
    query_string = f"""
                    INSERT INTO {market}.scenario_master (name, description, type, created_at, created_by) VALUES (:name, :description, :type, :created_at, :created_by);
                    """
    params = {
        'name':name,
        'description':description,
        'type':type,
        'created_at':now,
        'created_by':user
    }
    return query_string, params

def update_scenario_query(scenario_id, name, description, type, market, user, now):
    query_string = f"""
                    UPDATE {market}.scenario_master
                    SET name = :name,
                    description = :description,
                    type = :type,
                    modified_at = :modified_at,
                    modified_by = :modified_by
                    WHERE scenario_id = :scenario_id;
                    """
    params = {
        'name':name,
        'description':description,
        'type':type,
        'modified_at':now,
        'modified_by':user,
        'scenario_id':scenario_id
    }
    return query_string, params

def delete_scenario_query(scenario_id, market, user, now):
    query_string = f"""
                    UPDATE {market}.scenario_master
                    SET is_active = :is_active,
                    modified_at = :modified_at,
                    modified_by = :modified_by
                    WHERE scenario_id = :scenario_id;
                    """
    params = {
        'is_active': INACTIVE,
        'modified_at': now,
        'modified_by': user,
        'scenario_id': scenario_id
    }
    return query_string, params

def get_scenario_query(scenario_id, market):
    query_string = f"""
                    SELECT * FROM {market}.scenario_master WHERE scenario_id=?;"""
    params = [scenario_id]
    return query_string, tuple(params)

def get_menu_query(market):
    query_string = f"""
                    SELECT * FROM {market}.navigation WHERE is_active=1;"""
    return query_string, tuple()

def get_scenario_details_query():
    query_string = f"""
                SELECT * FROM scenario_details;
            """
    return query_string, tuple()