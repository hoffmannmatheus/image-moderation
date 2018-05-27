from django.urls import path

from . import api_views

urlpatterns = [
    path('image/<str:filter>/', api_views.list_images, name='list_images'),
    path('image/<int:image_id>/', api_views.image_by_id, name='image_by_id'),
]