# Generated by Django 4.0.3 on 2022-06-04 14:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Programme',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index_number', models.CharField(max_length=15, unique=True)),
                ('first_name', models.CharField(max_length=15)),
                ('last_name', models.CharField(blank=True, max_length=15, null=True)),
                ('level', models.IntegerField(choices=[(100, 'First Year'), (200, 'Second Year'), (300, 'Third Year'), (400, 'Final Year')], default=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone_number', models.CharField(max_length=12)),
                ('programme', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='students.programme')),
            ],
        ),
    ]
