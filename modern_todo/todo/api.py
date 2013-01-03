from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization

from django.contrib.auth.models import User

from todo.models import ToDo, ToDoList
from todo.util import PrettyJSONSerializer

class UserResource(ModelResource):
    lists = fields.ToManyField('todo.api.ToDoListResource', 'todolist_set', related_name="owner", null=False, full=True)

    class Meta:
        always_return_data = True
        excludes = ['password', "is_active", "is_staff", "is_superuser",]
        queryset = User.objects.all()
        resource_name = "user"
        serializer = PrettyJSONSerializer()
        authentication = Authentication()
        authorization = Authorization()


class ToDoListResource(ModelResource):
    todos = fields.ToManyField('todo.api.ToDoResource', 'todo_set', null=True)
    owner = fields.ToOneField('todo.api.UserResource', 'owner', related_name="lists")
    class Meta:
        always_return_data = True
        queryset = ToDoList.objects.all()
        resource_name = "todolist"
        serializer = PrettyJSONSerializer()
        authentication = Authentication()
        authorization = Authorization()

    def obj_create(self, bundle, request=None, **kwargs):
        return super(ToDoListResource, self).obj_create(bundle, request, owner=request.user)

    def apply_authorization_limits(self, request, object_list):
        if request:
            return object_list.filter(owner=request.user)
        else:
            return object_list


class ToDoResource(ModelResource):
    list = fields.ForeignKey(ToDoListResource, "list")

    class Meta:
        always_return_data = True
        queryset = ToDo.objects.all()
        resource_name = "todo"
        serializer = PrettyJSONSerializer()
        authentication = Authentication()
        authorization = Authorization()

    def apply_authorization_limits(self, request, object_list):
        if request:
            return object_list.filter(list__owner=request.user)
        else:
            return object_list
