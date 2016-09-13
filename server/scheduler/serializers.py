from django.contrib.auth.models import User
from scheduler.models import *
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'first_name', 'last_name', 'is_superuser')

class VertexSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Vertex
        fields = ('id', 'url', 'label', 'address', 'active', 'last_seen')

class EventRequestSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = EventRequest
        fields = ('id', 'requester', 'vertex_target', 'timestamp', 'json_text')
