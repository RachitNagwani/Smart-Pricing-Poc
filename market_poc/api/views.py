from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product
import os

def market_view(request):
    """
    Return the current MARKET environment variable
    """
    market = os.getenv('MARKET', 'UK').upper()
    return JsonResponse({"market": market})


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