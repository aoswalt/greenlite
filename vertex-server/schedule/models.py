from django.db import models
from django.utils import timezone

class Event(models.Model):
    priority = models.IntegerField()
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(default=timezone.now)
    repeat = models.BooleanField(default=False)
    expire_time = models.DateTimeField()
    signals_text = models.TextField()

    def is_expired(self):
        return timezone.now() >= expire_time
