from django.contrib import admin
from django.contrib.admin import ModelAdmin

from todo.models import ToDoList, ToDo

admin.site.register(ToDoList)

class AdminTodo(ModelAdmin):
    list_display = ("id", "text", "list")
    class Meta:
        model = ToDo

admin.site.register(ToDo, AdminTodo)