# Generated by Django 5.0.6 on 2024-06-01 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_remove_masterclass_media_remove_order_master_classes_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ecostaff',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
