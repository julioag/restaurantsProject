from django.db import models

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=70)
    food_type = models.CharField(max_length=50)
    rating = models.FloatField(default=2.5)
    checkbox = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name