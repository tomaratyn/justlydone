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
                          url(r'^$', login_required(views.JavaScriptDynamicView.as_view()), name="dynamic_todo_list"),
)

urlpatterns = patterns('',
                       (r'^/?$', include(jsdynamic_urls)),
                       (r'^statichtml/', include(static_urls)),
                       (r'^api/', include(testing_api.urls)),
                       (url(r'^accounts/login/$', 'django.contrib.auth.views.login', name="login")),
                       (url(r'^accounts/logout/$', 'django.contrib.auth.views.logout_then_login', name="logout")),

)
