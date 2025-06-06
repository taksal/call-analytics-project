from rest_framework import viewsets
from .models import CallData
from .serializers import CallDataSerializer

class CallDataViewSet(viewsets.ModelViewSet):
    queryset = CallData.objects.all()
    serializer_class = CallDataSerializer
