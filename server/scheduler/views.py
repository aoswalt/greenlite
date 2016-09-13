from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import viewsets
from scheduler.models import *
from scheduler.serializers import *

class User(viewsets.ModelViewSet):
    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Vertex(viewsets.ModelViewSet):
    model = Vertex
    queryset = Vertex.objects.all()
    serializer_class = VertexSerializer

class EventRequest(viewsets.ModelViewSet):
    model = EventRequest
    queryset = EventRequest.objects.all()
    serializer_class = EventRequestSerializer
