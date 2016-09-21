from django.contrib.auth.models import User
from rest_framework import viewsets
from scheduler.models import *
from scheduler.serializers import *
import json
import management
import requests

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class VertexView(viewsets.ModelViewSet):
    queryset = Vertex.objects.all()
    serializer_class = VertexSerializer

    def list(self, request):
        if 'HTTP_LABEL' in request.META and 'HTTP_ADDRESS' in request.META:
            management.mapping.greet_device(request.META['HTTP_LABEL'],
                                            request.META['HTTP_ADDRESS'])
        return super().list(request)

class EventRequestView(viewsets.ModelViewSet):
    queryset = EventRequest.objects.all()
    serializer_class = EventRequestSerializer

    def perform_create(self, serializer):
        event = serializer.save()
        target_label = event.vertex_target.label
        target_address = management.mapping.devices[target_label]['address']
        json_data = json.loads(event.json_text)
        json_data['signals_text'] = json.dumps(json_data['signals'])

        r = requests.post(target_address + 'event/', data=json_data)
        print(r.text)
