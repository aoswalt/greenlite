from rest_framework import serializers
from schedule.models import *

class EventSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'url', 'priority', 'start_time', 'end_time', 'repeat', 'expire_time', 'signals_text',)
