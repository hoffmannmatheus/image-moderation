from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view

from .models import Image, ModeratedImage, Moderator
from .serializers import ImageListSerializer


@api_view(['GET'])
def list_images(request, filter):
    """
    Lists images according to the given filter

    Request: 
        GET /image/{filter}/?moderator=m&page=x&size=y
        filters: all | pending | approved | moderated)

    Response:

    """
    if filter not in ['all', 'pending', 'approved', 'rejected', 'moderated']:
        return Response("Invalid filter value provided.", status=status.HTTP_400_BAD_REQUEST)

    if filter == 'pending':
        images = Image.objects.filter(moderatedimage=None).order_by('-timestamp')
    elif filter == 'moderated':
        images = Image.objects.filter(moderatedimage__isnull=False).order_by('-timestamp')
    elif filter == 'approved' or filter == 'rejected':
        filter_value = 1 if filter == 'approved' else 2
        images = Image.objects.filter(moderatedimage__decision__exact=filter_value).order_by('-timestamp')
    else:
        images = Image.objects.all().order_by('-timestamp')

    paginator = PageNumberPagination()
    page_size = 25
    try:
        size_param = request.query_params.get('size')
        if size_param:
            page_size = int(size_param)
    except ValueError:
        return Response("Invalid 'size' value provided.", status=status.HTTP_400_BAD_REQUEST)
    paginator.page_size = page_size

    images_page = paginator.paginate_queryset(images, request)
    serializer = ImageListSerializer(images_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def next_pending(request):
    image = Image.objects.filter(moderatedimage=None).order_by('timestamp').first()
    return Response(ImageListSerializer(image).data)


@api_view(['GET'])
def moderator_recents(request, name):
    moderator = None 
    try:
        moderator = Moderator.objects.get(name=name)
    except Moderator.DoesNotExist:
        return Response("moderator not found.", status=status.HTTP_400_BAD_REQUEST)
    images = Image.objects.filter(moderatedimage__moderator=moderator).order_by('-timestamp')[:5]
    serializer = ImageListSerializer(images, many=True)
    return Response(serializer.data)