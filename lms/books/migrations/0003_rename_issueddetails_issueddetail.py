# Generated by Django 4.0.3 on 2022-04-07 07:57

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('students', '0001_initial'),
        ('books', '0002_alter_book_isbn_alter_genre_name_alter_language_name_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='IssuedDetails',
            new_name='IssuedDetail',
        ),
    ]
