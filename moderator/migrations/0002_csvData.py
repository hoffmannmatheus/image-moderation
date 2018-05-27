
import csv
import pytz
from datetime import datetime

from django.db import migrations, models
from moderator.models import Image

def load_from_csv(apps, schema_editor):
    """
    Loads default image CSV data.
    file format must be: 'timestamp,url'
    """
    with open('data/images.csv') as f:
        reader = csv.reader(f, delimiter=',')
        images = [Image(timestamp=datetime.fromtimestamp(int(row[0]), tz=pytz.UTC), url=row[1]) for row in reader]
        Image.objects.bulk_create(images)

class Migration(migrations.Migration):

    dependencies = [
        ('moderator', '0001_initial')
    ]

    operations = [
        migrations.RunPython(load_from_csv),
    ]
