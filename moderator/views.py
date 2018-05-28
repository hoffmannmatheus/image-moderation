
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Image, Moderator, ModeratedImage, ModerationLog, APPROVED, REJECTED
from .serializers import ImageListSerializer


class ImageView(APIView):

  def get(self, request, image_id):
      """
      GET on a specified image.
      Request: 
          GET requires the ID.
      Response:
          Image object on success
          400 on non existant
      """
      image = None 
      try:
          image = Image.objects.get(pk=image_id)
      except Image.DoesNotExist:
          return Response("Image not found.", status=status.HTTP_400_BAD_REQUEST)
      return Response(ImageListSerializer(image).data)

  def put(self, request, image_id):
      """
      PUT on a specified image.
      Request: 
          PUT requires the ID, as well as body like: { "decision": "approved", "moderator": "name" }
      Response:
          Updated Image object on success
          400 on non existant
      """
      moderator = None 
      try:
          moderator = Moderator.objects.get(name=request.data.get('moderator'))
      except Moderator.DoesNotExist:
          return Response("'moderator' not found.", status=status.HTTP_400_BAD_REQUEST)

      image = None 
      try:
          image = Image.objects.get(pk=image_id)
      except Image.DoesNotExist:
          return Response("Image not found.", status=status.HTTP_400_BAD_REQUEST)

      decision = request.data.get('decision')
      if not decision or decision not in ['approved', 'rejected']:
          return Response("'decision' not found or invalid.", status=status.HTTP_400_BAD_REQUEST)
      decision = APPROVED if decision == 'approved' else REJECTED

      ModerationLog.objects.create(moderator=moderator, image=image, decision=decision)
      ModeratedImage.objects.update_or_create(image=image, defaults={'decision': decision, 'moderator': moderator})
      return Response(ImageListSerializer(Image.objects.get(pk=image_id)).data)