from email.policy import default
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from .models import Project, ToDo
from .serializers import TodoProjectModelSerializer, TodoNoteModelSerializer
from .filters import ProjectFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = TodoProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter



class TodoNoteModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = TodoNoteModelSerializer
