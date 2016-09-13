from django.contrib.auth.models import User
from django.db import models

class Vertex(models.Model):
    label = models.CharField(max_length=75)
    address = models.CharField(max_length=75)

    def __str__(self):
        return '{}: {}'.format(self.id, self.label)

class EventRequest(models.Model):
    requester = models.ForeignKey(User)
    vertex_target = models.ForeignKey(Vertex)
    timestamp = models.DateTimeField(auto_now_add=True)
    json_text = models.TextField()
