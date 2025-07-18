from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product
import os
from api.service import ScenarioService
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

def market_view(request):
    """
    Return the current MARKET environment variable
    """
    market = os.getenv('MARKET', 'UK').upper()
    markets = [{'id': 1, 'name': 'India'}, {'id': 2, 'name': 'UAE'}, {'id': 3, 'name': 'UK'}]
    return JsonResponse({"market": markets})


@csrf_exempt
def user_view(request):
    """
    Sample static user data
    """
    user_data = {
        "username": "tiger_chennai",
        "email": "tiger@example.com",
        "role": "admin"
    }
    return JsonResponse(user_data)


def item_view(request):
    """
    Fetch product data from the correct database, based on MARKET
    """
    try:
        products = Product.objects.all()
        product_list = [
            {'name': p.item, 'price': float(p.price), 'currency': p.currency}
            for p in products
        ]
        return JsonResponse(product_list, safe=False)
    except Exception as e:
        return JsonResponse({"error": f"DB query failed: {str(e)}"}, status=500)

@api_view(['GET'])
def get_scenarios(request):
    market = request.user_data.get("market")
    scenarios = ScenarioService.get_scenarios(market)
    return Response(scenarios,status=status.HTTP_200_OK)

@api_view(['POST'])
def create_scenario(request):
    market = request.user_data.get("market")
    name = request.data.get("name")
    description = request.data.get("description")
    type = request.data.get("type")
    user = request.user_data.get("user")
    
    scenarios = ScenarioService.create_scenario(name, description, type, market, user)

    return Response(scenarios,status=status.HTTP_200_OK)

@api_view(['POST'])
def update_scenario(request):
    market = request.user_data.get("market")
    scenario_id = request.data.get("scenario_id")
    name = request.data.get("name")
    description = request.data.get("description")
    type = request.data.get("type")
    user = request.user_data.get("user")
    
    scenarios = ScenarioService.update_scenario(scenario_id, name, description, type, market, user)

    return Response(scenarios,status=status.HTTP_200_OK)

@api_view(['POST'])
def delete_scenario(request):
    market = request.user_data.get("market")
    scenario_id = request.data.get("scenario_id")
    user = request.user_data.get("user")
    
    scenarios = ScenarioService.delete_scenario(scenario_id, market, user)

    return Response(scenarios,status=status.HTTP_200_OK)

@api_view(['POST'])
def get_scenario(request):
    market = request.user_data.get("market")
    scenario_id = request.data.get("scenario_id")
    
    scenario = ScenarioService.get_scenario(scenario_id, market)

    return Response(scenario,status=status.HTTP_200_OK)


@api_view(['GET'])
def get_menu(request):
    market = request.user_data.get("market")
    menu = ScenarioService.get_menu(market)
    return Response(menu, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_scenario_details(request):
    scenario_details = ScenarioService.get_scenario_details()
    return Response(scenario_details, status=status.HTTP_200_OK)