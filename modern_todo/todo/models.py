from django.db import models

class ToDoList(models.Model):
    name = models.CharField(max_length=140)
    creation_datetime = models.DateTimeField(auto_now_add=True)

class ToDo(models.Model):
    text = models.CharField(max_length=140)
    creation_datetime = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    completion_datetime = models.DateTimeField()
    list = models.ForeignKey(ToDoList)

