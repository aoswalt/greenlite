from django.shortcuts import render
from rest_framework import viewsets
from schedule.models import *
from schedule.serializers import *

class Event(viewsets.ModelViewSet):
    model = Event
    queryset = Event.objects.all()
    serializer_class = EventSerializer
