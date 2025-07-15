from django.urls import path
from .views import market_view, user_view, item_view, get_scenarios, create_scenario, update_scenario, delete_scenario, get_scenario

urlpatterns = [
    path('market', market_view, name='market'),
    path('user', user_view),
    path('item',item_view),
    path("scenarios", get_scenarios),
    path("create_scenario", create_scenario),
    path("update_scenario",update_scenario),
    path("delete_scenario", delete_scenario),
    path("get_scenario", get_scenario)
]
