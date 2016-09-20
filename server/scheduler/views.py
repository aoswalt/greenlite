from django.contrib.auth.models import User
from rest_framework import viewsets
from scheduler.models import *
from scheduler.serializers import *
import management

class User(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Vertex(viewsets.ModelViewSet):
    queryset = Vertex.objects.all()
    serializer_class = VertexSerializer

    def list(self, request):
        if 'HTTP_LABEL' in request.META and 'HTTP_ADDRESS' in request.META:
            management.mapping.greet_device(request.META['HTTP_LABEL'],
                                            request.META['HTTP_ADDRESS'])
        return super().list(request)

class EventRequest(viewsets.ModelViewSet):
    queryset = EventRequest.objects.all()
    serializer_class = EventRequestSerializer
