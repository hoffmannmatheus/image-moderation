'''
ui.views
'''

from django.shortcuts import render


def ui(request):
    """
    Serves react app for the image moderation UI.
    """
    context = { 'props': {'moderators': [ 'dog', 'mat' ] } }
    return render(request, 'ui/base.html', context=context)
