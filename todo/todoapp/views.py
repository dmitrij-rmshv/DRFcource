from email.policy import default
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from .models import Project, ToDo
from .serializers import TodoProjectModelSerializer, TodoNoteModelSerializer, \
    SimpleNoteModelSerializer, TodoProjectPostSerializer, TodoNotePostSerializer
from .filters import ProjectFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = TodoProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['POST']:
            return TodoProjectPostSerializer
        return TodoProjectModelSerializer


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoNoteModelViewSet(ModelViewSet):
    queryset = ToDo.objects.filter(is_active=True)
    serializer_class = TodoNoteModelSerializer
    filterset_fields = ['project']
    pagination_class = ToDoLimitOffsetPagination

    def retrieve(self, request, pk=None):
        instance = get_object_or_404(ToDo, pk=pk)
        serializer = SimpleNoteModelSerializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        serializer = SimpleNoteModelSerializer(instance)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method in ['POST']:
            return TodoNotePostSerializer
        return TodoNoteModelSerializer

