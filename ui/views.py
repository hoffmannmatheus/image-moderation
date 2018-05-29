'''
ui.views
'''

from django.shortcuts import render
from moderator.models import Moderator


def ui(request):
    """
    Serves react app for the image moderation UI.
    """
    moderators = list(map( lambda x: x.name, Moderator.objects.all() ))
    context = { 'props': {'moderators': moderators } }
    return render(request, 'ui/base.html', context=context)
