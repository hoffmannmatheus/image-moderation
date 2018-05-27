from django.db import models


APPROVED = 1
REJECTED = 2

IMAGE_MODERATION_STATES = (
  (APPROVED, 'Approved'),
  (REJECTED, 'Rejected'),
)


class Image(models.Model):
  """
  Represents an raw Image Resource that is added to the system.
  """
  url = models.TextField(null=False, blank=False)
  timestamp = models.DateTimeField(blank=False, null=False, help_text="time this image was created")
  
  def __str__(self):
    return self.url


class Moderator(models.Model):
  """
  Represents a moderator, resopnsible for moderating images.
  """
  name = models.TextField(null=False, blank=False)

  def __str__(self):
    return self.name


class ModeratedImage(models.Model):
  """
  It is the Moderated version of a given image resource.
  There can be only 1 moderated image per resource.
  """
  image = models.OneToOneField(Image, on_delete=models.PROTECT, primary_key=True)
  moderator = models.ForeignKey(Moderator, on_delete=models.PROTECT)
  timestamp = models.DateTimeField(auto_now_add=True)
  decision = models.IntegerField(choices=IMAGE_MODERATION_STATES, default=REJECTED)


class ModerationLog(models.Model):
  """
  The moderation log, to keep history of all moderations for images and moderators.
  """
  image = models.ForeignKey(Image, on_delete=models.PROTECT)
  moderator = models.ForeignKey(Moderator, on_delete=models.PROTECT)
  timestamp = models.DateTimeField(auto_now_add=True)
  decision = models.IntegerField(choices=IMAGE_MODERATION_STATES, default=REJECTED)
