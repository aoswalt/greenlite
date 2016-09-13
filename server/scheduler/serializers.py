from scheduler.models import *
from rest_framework import serializers

class VertexSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Vertex
        fields = ('id', 'label', 'address')
