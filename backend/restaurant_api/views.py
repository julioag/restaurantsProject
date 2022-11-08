from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Restaurant
from .serializers import RestaurantSerializer

# Create your views here.
class RestaurantList(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            "name": request.data.get("name"),
            "location": request.data.get("location"),
            "food_type": request.data.get("food_type"),
            "rating": request.data.get("rating"),
            "checkbox": request.data.get("checkbox"),
        }
        serializer = RestaurantSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class restaurantDetailApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, res_id):
        '''
        Helper method to get the object with given res_id
        '''
        try:
            return Restaurant.objects.get(id=res_id)
        except Restaurant.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, res_id, *args, **kwargs):
        '''
        Retrieves the restaurant with given res_id
        '''
        restaurant_instance = self.get_object(res_id)
        if not restaurant_instance:
            return Response(
                {"res": "Object with restaurant id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = RestaurantSerializer(restaurant_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, res_id, *args, **kwargs):
        '''
        Updates the restaurant item with given res_id if exists
        '''
        restaurant_instance = self.get_object(res_id)
        if not restaurant_instance:
            return Response(
                {"res": "Object with restaurant id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'name': request.data.get('name'), 
            'location': request.data.get('location'), 
            'food_type': request.data.get('food_type'),
            'rating': request.data.get('rating'),
            'checkbox': request.data.get('checkbox'),
        }
        serializer = RestaurantSerializer(instance = restaurant_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, res_id, *args, **kwargs):
        '''
        Deletes the restaurant item with given res_id if exists
        '''
        restaurant_instance = self.get_object(res_id)
        if not restaurant_instance:
            return Response(
                {"res": "Object with restaurant id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        restaurant_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
class RestaurantFilteredByDate(APIView):
    def get(self, request, date, *args, **kwargs):
        restaurants = Restaurant.objects.filter(created_at__date__gte=date)
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)