import ast
from django.shortcuts import render
from rest_framework import viewsets
from schedule.models import *
from schedule.serializers import *

from signals import schedule

class Event(viewsets.ModelViewSet):
    model = Event
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def perform_create(self, serializer):
        new_event = {
            'priority': int('0' + self.request.data['priority']),
            'startTime': int('0' + self.request.data.get('start_time', 0)),
            'endTime': int('0' + self.request.data.get('end_time', 0)),
            'repeat': self.request.POST.get('repeat', False),
            'expireTime': int('0' + self.request.data.get('expire_time', 0)),
            'signals': ast.literal_eval(self.request.data['signals_text']),
        }
        schedule.add_event(new_event)

        serializer.save()
