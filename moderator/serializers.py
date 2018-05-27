
from rest_framework import serializers, exceptions

from .models import Image

class ImageListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Image
    fields = ('id', 'url', 'timestamp', 'decision')
  id = serializers.IntegerField()
  url = serializers.CharField()
  timestamp = serializers.DateTimeField()
  decision = serializers.IntegerField(source='moderatedimage.decision')