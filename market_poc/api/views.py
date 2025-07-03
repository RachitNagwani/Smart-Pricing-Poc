from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .market_data import get_market_data

def market_view(request):
    # market_param = request.GET.get('market')  # get ?market=IND from URL
    # data = get_market_data(market_param)
    data = get_market_data()
    if 'error' in data:
        return JsonResponse(data, status=400)
    return JsonResponse(data)

@csrf_exempt
def user_view(request):
    # User details
    user_data = {
        "username": "tiger_chennai",
        "email": "tiger@example.com",
        "role": "admin"
    }
    return JsonResponse(user_data)
