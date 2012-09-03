from django.db import models

class ToDoList(models.Model):
    name = models.CharField(max_length=140)
    creation_datetime = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return u'%s' % self.name

class ToDo(models.Model):
    text = models.CharField(max_length=140)
    creation_datetime = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    completion_datetime = models.DateTimeField(blank=True, null=True)
    list = models.ForeignKey(ToDoList)

    def __unicode__(self):
        return u'%s%s' % (self.text, " (done)" if self.complete else "")