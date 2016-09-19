import time
from django.db import models

class Event(models.Model):
    priority = models.IntegerField()
    start_time = models.BigIntegerField(default=time.time)
    end_time = models.BigIntegerField(default=time.time)
    repeat = models.BooleanField(default=False)
    expire_time = models.BigIntegerField(null=True, blank=True)
    signals_text = models.TextField()

    def is_expired(self):
        return time.time() >= expire_time
