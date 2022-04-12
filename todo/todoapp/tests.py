from rest_framework import status
from rest_framework.test import APITestCase
from mixer.backend.django import mixer

from .models import ToDo
from main.models import TodoUser


class TestTodoProjectModelViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestTodoNoteModelViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_mixer(self):
        note = mixer.blend(ToDo)
        admin = TodoUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/notes/{note.id}/', {'text': 'Убрать авторизацию!'})
        # self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

