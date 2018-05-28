from django.urls import path

from . import api_views, views

urlpatterns = [
    path('image/<int:image_id>/', views.ImageView.as_view(), name='image_by_id_view'),
    path('image/<str:filter>/', api_views.list_images, name='list_images'),
    path('image/next/', api_views.next_pending, name='image_next_pending'),
    path('moderator/<str:name>/recent/', api_views.moderator_recents, name='moderator_recents'),
]