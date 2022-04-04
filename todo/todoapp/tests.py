from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from django.contrib.auth.models import User

from .views import TodoProjectModelViewSet, TodoNoteModelViewSet
from .models import Project, ToDo
from main.models import TodoUser


class TestTodoProjectModelViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        author = TodoUser.objects.create(username='Пупкин')
        project = Project.objects.create(title='Geekshop')
        project.developers.add(author)
        admin = TodoUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/projects/{project.id}/', {'title': 'Сетевой чат'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.title,'Сетевой чат')