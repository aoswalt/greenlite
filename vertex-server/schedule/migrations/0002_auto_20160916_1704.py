# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-16 17:04
from __future__ import unicode_literals

from django.db import migrations, models
import time


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end_time',
            field=models.BigIntegerField(default=time.time),
        ),
        migrations.AlterField(
            model_name='event',
            name='expire_time',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_time',
            field=models.BigIntegerField(default=time.time),
        ),
    ]