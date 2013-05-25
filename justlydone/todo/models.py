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

from datetime import datetime
import pytz

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class ToDoList(models.Model):
    name = models.CharField(max_length=140)
    creation_datetime = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, null=False, blank=False)

    class Meta:
        ordering = ["-name", "-creation_datetime"]

    def __unicode__(self):
        return u'%s' % self.name


class ToDo(models.Model):
    text = models.CharField(max_length=140)
    creation_datetime = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    completion_datetime = models.DateTimeField(blank=True, null=True)
    list = models.ForeignKey(ToDoList)

    class Meta:
        # this should put the incomplete todos before the complete ones but might change if we move away from pgsql
        ordering = ["-completion_datetime", "-creation_datetime"]

    def __unicode__(self):
        return u'%s%s' % (self.text, " (done)" if self.complete else "")

    def save(self, *args, **kwargs):
        if self.complete and self.completion_datetime is None:
            self.completion_datetime = datetime.utcnow().replace(tzinfo=pytz.timezone(settings.TIME_ZONE))
        elif not self.complete and self.completion_datetime is not None:
            self.completion_datetime = None
        super(ToDo, self).save(*args, **kwargs)


