from django.conf.urls import patterns, url

import views

urlpatterns = patterns('',
    url(r'^$', views.Index.as_view(), name='index'),
    url(r'^todolists$', views.StaticListTodoLists.as_view(), name="static_todo_lists")
)
