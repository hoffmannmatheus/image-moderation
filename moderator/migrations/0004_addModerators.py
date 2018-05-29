
import csv
import pytz
from datetime import datetime

from django.db import migrations, models
from moderator.models import Moderator

def load_from_csv(apps, schema_editor):
    """
    Adds test data (moderators).
    """
    Moderator.objects.create(name='moderator1')
    Moderator.objects.create(name='moderator2')

class Migration(migrations.Migration):

    dependencies = [
        ('moderator', '0003_auto_20180527_2104')
    ]

    operations = [
        migrations.RunPython(load_from_csv),
    ]
