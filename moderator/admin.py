from django.contrib import admin
from .models import Image, ModeratedImage, Moderator, ModerationLog


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
  list_display = (
    'url',
    'timestamp'
  )


@admin.register(Moderator)
class ModeratorAdmin(admin.ModelAdmin):
  list_display = (
    'name',
  )


@admin.register(ModeratedImage)
class ModeratedImageAdmin(admin.ModelAdmin):
  list_display = (
    'image',
    'moderator',
    'decision',
    'timestamp'
  )
  raw_id_fields = (
    'image',
    'moderator',
  )


@admin.register(ModerationLog)
class ModerationLogAdmin(admin.ModelAdmin):
  list_display = (
    'image',
    'moderator',
    'decision',
    'timestamp'
  )
  raw_id_fields = (
    'image',
    'moderator',
  )