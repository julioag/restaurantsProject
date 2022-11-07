from django.urls import path, include
from .views import (RestaurantList, restaurantDetailApiView)

urlpatterns = [
  path('api', RestaurantList.as_view()),
  path('api/<int:res_id>', restaurantDetailApiView.as_view()),
]