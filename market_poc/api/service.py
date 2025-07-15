from api.repository import ScenarioRepository

class ScenarioService:
    def get_scenarios(market):
        scenario_list = ScenarioRepository.get_scenarios(market)
        response = scenario_list.to_dict("records")
        return response
    
    def create_scenario(name, description, type, market, user):
        created = ScenarioRepository.create_scenario(name, description, type, market, user)
        if created:
            return {"message": "scenario_created"}
        else:
            return {"message": "scenario_creation_failed"}
    
    def update_scenario(scenario_id, name, description, type, market, user):
        updated = ScenarioRepository.update_scenario(scenario_id, name, description, type, market, user)
        if updated:
            return {"message": "scenario_updated"}
        else:
            return {"message": "scenario_updation_failed"}
    
    def delete_scenario(scenario_id, market, user):
        deleted = ScenarioRepository.delete_scenario(scenario_id, market, user)
        if deleted:
            return {"message": "scenario_deleted"}
        else:
            return {"message": "scenario_deletion_failed"}

    def get_scenario(scenario_id, market):
        scenario = ScenarioRepository.get_scenario(scenario_id, market)
        response = scenario.to_dict("records")
        return response