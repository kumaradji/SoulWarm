# Generated by Django 5.0.6 on 2024-06-17 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_vipmessage'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ecostaff',
            old_name='image_urls',
            new_name='images',
        ),
        migrations.AddField(
            model_name='ecostaff',
            name='upload',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]