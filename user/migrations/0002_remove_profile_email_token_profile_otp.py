# Generated by Django 4.2.8 on 2023-12-18 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='email_token',
        ),
        migrations.AddField(
            model_name='profile',
            name='otp',
            field=models.IntegerField(null=True),
        ),
    ]
