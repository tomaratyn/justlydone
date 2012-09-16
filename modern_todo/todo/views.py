from django.views.generic import ListView, TemplateView

from todo.api import ToDoListResource, ToDoResource
from todo.models import ToDoList as ToDoListModel



class Index(TemplateView):
    template_name = "base.html"


class StaticListTodoLists(ListView):
    model = ToDoListModel
    context_object_name = "todolists"


class JavaScriptDynamicView(TemplateView):
    template_name = "js_todo_list.html"

    def get_context_data(self, **kwargs):
        return {"ToDoListResource": ToDoListResource,
                "ToDoResource": ToDoResource, }
