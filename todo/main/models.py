from uuid import uuid4

from django.db import models
from django.contrib.auth.models import AbstractUser


class TodoUser(AbstractUser):
    uid = models.UUIDField(default=uuid4, primary_key=True)
    email = models.EmailField(blank=True, unique=True)

    def __str__(self) -> str:
        return self.first_name + self.last_name

    class Meta(AbstractUser.Meta):
        pass
