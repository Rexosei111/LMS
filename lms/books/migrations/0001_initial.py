# Generated by Django 4.0.3 on 2022-06-04 14:27

import books.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fetch_data', models.BooleanField(default=True)),
                ('isbn', models.CharField(help_text='13 Character ISBN number (https://www.isbn-international.org/content/what-isbn)', max_length=20, unique=True)),
                ('author', models.CharField(blank=True, max_length=100, null=True)),
                ('title', models.CharField(max_length=200)),
                ('summary', models.TextField(help_text='Enter brief description of the book')),
                ('publisher', models.CharField(blank=True, max_length=100, null=True)),
                ('published_date', models.DateField(blank=True, null=True)),
                ('page_count', models.PositiveIntegerField(blank=True, null=True)),
                ('available_copies', models.PositiveIntegerField(blank=True, null=True)),
                ('image_link', models.URLField(blank=True, null=True)),
                ('embeddable', models.BooleanField(blank=True, null=True)),
                ('image_small_thumbnail', models.URLField(blank=True, null=True)),
                ('average_rating', models.FloatField(blank=True, null=True)),
                ('shelf_number', models.PositiveIntegerField(blank=True, null=True)),
                ('date_added', models.DateField(auto_now_add=True, null=True)),
                ('category', books.models.ListField(blank=True, null=True, token=',')),
            ],
        ),
        migrations.CreateModel(
            name='BookReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('rating', models.PositiveIntegerField(choices=[(0, '0'), (1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')], help_text='Rate this book on the scale of 1 - 5', null=True)),
                ('review', models.TextField(null=True)),
                ('reviewed_at', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text="Enter the book's natural language (e.g. English, French, Japanese etc.)", max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='BorrowedBooks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('issued_date', models.DateTimeField(auto_now_add=True)),
                ('deadline', models.DateTimeField()),
                ('book', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='books.book')),
            ],
        ),
    ]
