from api.constants import IS_ACTIVE


def get_scenarios_query(market):
    query_string = f"""
                    SELECT * FROM {market}.scenario_master WHERE is_active=?;"""
    params = [IS_ACTIVE]
    return query_string, params

def create_scenario_query(name, description, type, now, market):
    query_string = f"""
                    INSERT INTO {market}.scenario_master (name, description, type, created_at, created_by) VALUES ('{name}', '{description}', '{type}', '{now}', 'test');
                    """
    return query_string

def update_scenario_query(scenario_id, name, market):
    query_string = f"""
                    UPDATE {market}.scenario_master
                    SET name = '{name}'
                    WHERE scenario_id = {scenario_id};
                    """
    return query_string

def delete_scenario_query(scenario_id, market):
    query_string = f"""
                    UPDATE {market}.scenario_master
                    SET is_active = 0
                    WHERE scenario_id = {scenario_id};
                    """
    return query_string

def get_scenario_query(scenario_id, market):
    query_string = f"""
                    SELECT * FROM {market}.scenario_master WHERE scenario_id=?;"""
    params = [scenario_id]
    return query_string, params