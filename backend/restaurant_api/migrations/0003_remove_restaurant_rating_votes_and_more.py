# Generated by Django 4.1.3 on 2022-11-08 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant_api', '0002_rename_restaurants_restaurant'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurant',
            name='rating_votes',
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='rating',
            field=models.FloatField(default=2.5),
        ),
    ]