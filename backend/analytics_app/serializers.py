from rest_framework import serializers
from .models import CallData

class CallDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallData
        fields = '__all__'
