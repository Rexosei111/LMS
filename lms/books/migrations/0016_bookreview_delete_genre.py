# Generated by Django 4.0.3 on 2022-05-02 21:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0015_remove_book_genre'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('rating', models.FloatField(help_text='Rate this book on the scale of 1 - 5', null=True)),
                ('review', models.TextField(null=True)),
                ('reviewed_at', models.DateField(auto_now=True)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.book')),
            ],
        ),
        migrations.DeleteModel(
            name='Genre',
        ),
    ]
