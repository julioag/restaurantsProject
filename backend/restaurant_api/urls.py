from django.urls import path, include
from .views import (RestaurantList)

urlpatterns = [
  path('', RestaurantList.as_view()),
]