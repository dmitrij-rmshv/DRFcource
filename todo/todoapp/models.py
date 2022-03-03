from django.db import models

from main.models import TodoUser

# Create your models here.
# Добавить модель Project. Это проект, для которого записаны TODO. 
# У него есть название, может быть ссылка на репозиторий и набор 
# пользователей, которые работают с этим проектом. 
# Создать модель, выбрать подходящие типы полей и связей с другими моделями.

# Добавить модель TODO. Это заметка. У ToDo есть проект, 
# в котором сделана заметка, текст заметки, дата создания и обновления, 
# пользователь, создавший заметку. 
# Содержится и признак — активно TODO или закрыто. 
# Выбрать подходящие типы полей и связей с другими моделями.

class Project(models.Model):
    title = models.CharField(max_length=64, verbose_name='Название проекта')
    repo_link = models.URLField(blank=True, verbose_name='ссылка на репозиторий')
    developers = models.ManyToManyField(TodoUser, related_name='projects' verbose_name='пользователи проекта')


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='notes', verbose_name='Заметка проекта')
    text = models.TextField(max_length=1024, verbose_name='текст заметки')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='создана')
    modified_at = models.DateTimeField(auto_now=True, verbose_name='модифицирована')
    user = models.ForeignKey(TodoUser, on_delete=models.PROTECT, verbose_name='от пользователя')
    is_active = models.BooleanField(default=True)
