from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import TodoProjectModelSerializer, TodoNoteModelSerializer


class TodoProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = TodoProjectModelSerializer


class TodoNoteModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = TodoNoteModelSerializer
