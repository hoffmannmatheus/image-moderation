"""
moderator URL Configuration
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'api/', include('moderator.urls')),
    path(r'ui/', include('ui.urls')),
]
