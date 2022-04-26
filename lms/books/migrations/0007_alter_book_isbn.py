# Generated by Django 4.0.3 on 2022-04-15 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0006_book_fetch_data_book_image_link_book_page_count_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='isbn',
            field=models.CharField(help_text='13 Character ISBN number (https://www.isbn-international.org/content/what-isbn)', max_length=20),
        ),
    ]
