from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import TodoUser
from .serializers import TodoUserModelSerializer, EnlargedTodoUserModelSerializer


class TodoUserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return EnlargedTodoUserModelSerializer
        return TodoUserModelSerializer
