from django.contrib import admin

from todo.models import ToDoList, ToDo

admin.site.register(ToDoList)

admin.site.register(ToDo)