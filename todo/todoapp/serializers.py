from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, ToDo
from main.serializers import TodoUserModelSerializer


class SimpleNoteModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ('text', )


class TodoProjectModelSerializer(HyperlinkedModelSerializer):
    # developers = TodoUserModelSerializer(many=True)
    # notes = SimpleNoteModelSerializer(many=True)
    class Meta:
        model = Project
        fields = ('title', 'repo_link', 'developers', 'notes',)


class TodoNoteModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = ('project', 'user', 'text', 'created_at', 'modified_at',)
