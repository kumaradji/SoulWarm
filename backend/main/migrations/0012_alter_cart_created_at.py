# Generated by Django 5.0.6 on 2024-06-10 15:33

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_rename_address_order_title_remove_cart_total_cost_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
