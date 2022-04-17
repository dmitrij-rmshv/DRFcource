from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from main.models import TodoUser

class Command(BaseCommand):
    help = 'Add some users in DB'

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write("Deleting old user data...")
        TodoUser.objects.all().delete()

        self.stdout.write("Creating new user data...")
        TodoUser.objects.create(username='sleepy', password='djangorest', first_name='John', last_name='Biden', email='president@usa.us')
        TodoUser.objects.create(username='marat', first_name='Марат', last_name='Степанков', email='kabardin@balakarya.ru')



