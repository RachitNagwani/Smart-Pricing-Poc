from api.repository import ScenarioRepository

class ScenarioService:
    def get_scenarios(market):
        scenario_list = ScenarioRepository.get_scenarios(market)
        response = scenario_list.to_dict("records")
        return response
    
    def create_scenario(name, description, type, market):
        created = ScenarioRepository.create_scenario(name, description, type, market)
        if created:
            return {"message": "scenario_created"}
        else:
            return {"message": "scenario_creation_failed"}
    
    def update_scenario(scenario_id, name, market):
        response = ScenarioRepository.update_scenario(scenario_id, name, market)
    
    def delete_scenario(scenario_id, market):
        response = ScenarioRepository.delete_scenario(scenario_id, market)

    def get_scenario(scenario_id, market):
        scenario = ScenarioRepository.get_scenario(scenario_id, market)
        response = scenario.to_dict("records")
        return response