from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

class Vertex(models.Model):
    label = models.CharField(max_length=75)
    address = models.CharField(max_length=75)
    active = models.BooleanField(default=True)
    last_seen = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return '{}: {} @ {}'.format(self.id, self.label, self.address)

class EventRequest(models.Model):
    requester = models.ForeignKey(User)
    vertex_target = models.ForeignKey(Vertex)
    timestamp = models.DateTimeField(auto_now_add=True)
    json_text = models.TextField()
