from django.urls import path
from .views import market_view, user_view, item_view

urlpatterns = [
    path('market/', market_view, name='market'),
    path('user', user_view),
    path('item',item_view)
]
