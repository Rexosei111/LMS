# Generated by Django 4.0.3 on 2022-05-02 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0012_book_embeddable'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='average_rating',
            field=models.FloatField(blank=True, null=True),
        ),
    ]