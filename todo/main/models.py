from uuid import uuid4

from django.db import models
from django.contrib.auth.models import AbstractUser


class TodoUser(AbstractUser):
    uid = models.UUIDField(default=uuid4, primary_key=True)
    email = models.EmailField(blank=True, unique=True)

    class Meta(AbstractUser.Meta):
        pass
