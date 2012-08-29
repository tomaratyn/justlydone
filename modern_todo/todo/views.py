from django.views.generic import ListView, TemplateView

from todo.models import ToDoList


class Index(TemplateView):
    template_name = "base.html"


class StaticListTodoLists(ListView):
    model = ToDoList
    context_object_name = "todolists"


