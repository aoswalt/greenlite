from django.db import models

# Create your models here.
class Vertex(models.Model):
    label = models.CharField(max_length=75)
    address = models.CharField(max_length=75)

    def __str__(self):
        return '{}: {}'.format(self.id, self.label)
