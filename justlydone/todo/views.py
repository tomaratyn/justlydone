# Copyright (C) 2012  The Boulevard Platform Inc.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Contributors:
#  - Tom Aratyn <tom@aratyn.name>

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import ListView, TemplateView

from todo.api import ToDoListResource, ToDoResource
from todo.models import ToDoList as ToDoListModel
from todo.util import do_not_cache_response


class Index(TemplateView):
    template_name = "base.html"

    @method_decorator(do_not_cache_response)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(Index, self).dispatch(*args, **kwargs)


class StaticListTodoLists(ListView):
    model = ToDoListModel
    context_object_name = "todolists"

    @method_decorator(do_not_cache_response)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(StaticListTodoLists, self).dispatch(*args, **kwargs)


class JavaScriptDynamicView(TemplateView):
    template_name = "js_todo_list.html"

    def get_context_data(self, **kwargs):
        return {"ToDoListResource": ToDoListResource,
                "ToDoResource": ToDoResource,
                "request": self.request }

    @method_decorator(do_not_cache_response)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(JavaScriptDynamicView, self).dispatch(*args, **kwargs)