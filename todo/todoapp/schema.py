from dataclasses import fields
import graphene
from graphene_django import DjangoObjectType

from .models import Project, ToDo
from main.models import TodoUser


class ProjectType(DjangoObjectType):

    class Meta:
        model = Project
        fields = '__all__'


class DevelopersType(DjangoObjectType):

    class Meta:
        model = TodoUser
        fields = '__all__'


class NotesType(DjangoObjectType):

    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):

    all_projects = graphene.List(ProjectType)

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    
    def resolve_all_projects(root, info):
        return Project.objects.all()
    
    project_by_title_search = graphene.List(ProjectType, match_title_search=graphene.String())

    def resolve_project_by_title_search(self, info, match_title_search):
        if match_title_search:
            return Project.objects.filter(title__contains=match_title_search)
        return Project.objects.all()


schema = graphene.Schema(query=Query)