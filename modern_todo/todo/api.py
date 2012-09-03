from tastypie import fields
from tastypie.resources import ModelResource

from todo.models import ToDo, ToDoList


class ToDoListResource(ModelResource):
    todos = fields.ToManyField('todo.api.ToDoResource', 'todo_set')
    class Meta:
        queryset = ToDoList.objects.all()
        resource_name = "todolist"


class ToDoResource(ModelResource):
    list = fields.ForeignKey(ToDoListResource, "list")

    class Meta:
        queryset = ToDo.objects.all()
        resource_name = "todo"
