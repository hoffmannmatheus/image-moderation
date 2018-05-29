from django.urls import path

from . import api_views, views

urlpatterns = [
    path('images/<int:image_id>/', views.ImageView.as_view(), name='image_by_id_view'),
    path('images/<str:filter>/', api_views.list_images, name='list_images'),
    path('images/next/', api_views.next_pending, name='image_next_pending'),
    path('moderator/<str:name>/recent/', api_views.moderator_recents, name='moderator_recents'),
]