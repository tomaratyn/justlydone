from datetime import datetime
from django.db import models

from django.contrib.auth.models import User

class ToDoList(models.Model):
    name = models.CharField(max_length=140)
    creation_datetime = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, null=False, blank=False)

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

    def save(self, *args, **kwargs):
        if self.complete and self.completion_datetime is None:
            self.completion_datetime = datetime.utcnow()
        elif not self.complete and self.completion_datetime is not None:
            self.completion_datetime = None
        super(ToDo, self).save(*args, **kwargs)


