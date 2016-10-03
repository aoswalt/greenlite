from django.contrib.auth.models import User
from rest_framework import serializers
from scheduler.models import *
import time

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'first_name', 'last_name', 'is_superuser')

class VertexSerializer(serializers.HyperlinkedModelSerializer):
    active = serializers.SerializerMethodField(method_name='is_active')

    def is_active(self, vert):
        active_seconds = 15
        return (time.time() - active_seconds) <= vert.last_seen

    class Meta:
        model = Vertex
        fields = ('id', 'url', 'label', 'address', 'enabled', 'last_seen', 'active')

class EventRequestSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = EventRequest
        fields = ('id', 'url', 'requester', 'vertex_target', 'timestamp', 'json_text')
