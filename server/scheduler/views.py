from django.shortcuts import render
from rest_framework import viewsets
from scheduler.models import *
from scheduler.serializers import *

# Create your views here.
class Vertex(viewsets.ModelViewSet):
    model = Vertex
    queryset = Vertex.objects.all()
    serializer_class = VertexSerializer
