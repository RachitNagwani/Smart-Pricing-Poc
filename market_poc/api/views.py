from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os

from .models import ProductIND, ProductUK, ProductUS

def market_view(request):
    """
    Return current MARKET info from env
    """
    market = os.getenv('MARKET', 'UK').upper()
    return JsonResponse({"market": market})

@csrf_exempt
def user_view(request):
    """
    Sample user data response
    """
    user_data = {
        "username": "tiger_chennai",
        "email": "tiger@example.com",
        "role": "admin"
    }
    return JsonResponse(user_data)

def item_view(request):
    import os
    from django.http import JsonResponse
    from . import models

    market_param = os.getenv('MARKET', 'UK').strip().upper()

    model_map = {
        'IND': models.ProductIND,
        'UK': models.ProductUK,
        'USA': models.ProductUS,
    }

    ProductModel = model_map.get(market_param)

    if not ProductModel:
        return JsonResponse({"error": f"Unsupported market: {market_param}"}, status=400)

    try:
        products = ProductModel.objects.all()
        product_list = [
            {'name': p.item, 'price': float(p.price), 'currency': p.currency}
            for p in products
        ]
        return JsonResponse(product_list, safe=False)
    except Exception as e:
        return JsonResponse({"error": f"DB query failed: {str(e)}"}, status=500)
