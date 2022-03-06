from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, ToDo


class TodoProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('title', 'repo_link', 'developers', 'notes',)


class TodoNoteModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = ('project', 'user', 'text', 'created_at', 'modified_at',)
