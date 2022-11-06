from django.shortcuts import render
from django.http import HttpResponse
from .models import Restaurants

# Create your views here.
def index(request):
    latest_restaurants_list = Restaurants.objects.order_by('-created_at')
    output = ', '.join([r.name for r in latest_restaurants_list])
    return HttpResponse(output)