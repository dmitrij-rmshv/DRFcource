from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase

from .views import TodoUserCustomViewSet
from .models import TodoUser


class TestTodoUserCustomViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = TodoUserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_get_detail(self):
        author = TodoUser.objects.create(username='Пупкин')
        client = APIClient()
        response = client.get(f'/api/users/{author.uid}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        author = TodoUser.objects.create(username='Пупкин')
        client = APIClient()
        admin = TodoUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/users/{author.uid}/', {'username':'Залупкин'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_author = TodoUser.objects.get(uid=author.uid)
        self.assertEqual(new_author.username, 'Залупкин')
        client.logout()


class ApiTestTodoUserCustomViewSet(APITestCase):

    def test_edit_admin(self):
        author = TodoUser.objects.create(username='Пупкин')
        admin = TodoUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/users/{author.uid}/', {'username':'Залупкин'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_author = TodoUser.objects.get(uid=author.uid)
        self.assertEqual(new_author.username, 'Залупкин')
