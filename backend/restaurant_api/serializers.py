from rest_framework import serializers
from .models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ["name", "location", "food_type", "rating", "rating_votes", "checkbox", "created_at", "updated_at"]