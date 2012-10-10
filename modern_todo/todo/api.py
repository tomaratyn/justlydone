from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization

from todo.models import ToDo, ToDoList
from todo.util import PrettyJSONSerializer


class ToDoListResource(ModelResource):
    todos = fields.ToManyField('todo.api.ToDoResource', 'todo_set', null=True)

    class Meta:
        always_return_data = True
        queryset = ToDoList.objects.all()
        resource_name = "todolist"
        serializer = PrettyJSONSerializer()
        authentication = Authentication()
        authorization = Authorization()


class ToDoResource(ModelResource):
    list = fields.ForeignKey(ToDoListResource, "list")

    class Meta:
        always_return_data = True
        queryset = ToDo.objects.all()
        resource_name = "todo"
        serializer = PrettyJSONSerializer()
        authentication = Authentication()
        authorization = Authorization()
