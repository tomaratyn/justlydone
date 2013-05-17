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

from django.conf.urls import include, patterns, url
from django.contrib.auth.decorators import login_required
from tastypie.api import Api
from todo import api, views

todolistResource = api.ToDoListResource()
todoResource = api.ToDoResource()
userResource = api.UserResource()

testing_api = Api(api_name="testing")
testing_api.register(todoResource)
testing_api.register(todolistResource)
testing_api.register(userResource)

static_urls = patterns('',
                       url(r'^$', views.Index.as_view(), name='index'),
                       url(r'^todolists$', views.StaticListTodoLists.as_view(), name="static_todo_lists"),
)

jsdynamic_urls = patterns('',
                          url(r'^$', views.JavaScriptDynamicView.as_view(), name="dynamic_todo_list"),
)

urlpatterns = patterns('',
                       (r'^/?$', include(jsdynamic_urls)),
                       (r'^statichtml/', include(static_urls)),
                       (r'^api/', include(testing_api.urls)),
                       (url(r'^accounts/login/$', 'django.contrib.auth.views.login', name="login")),
                       (url(r'^accounts/logout/$', 'django.contrib.auth.views.logout_then_login', name="logout")),

)
