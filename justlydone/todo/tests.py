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

import datetime
from datetime import timedelta
from django.contrib.auth.models import User
from django.test import TestCase

from models import ToDo, ToDoList

class TodoRecordCompletionTimeTest(TestCase):

    def test_recording_on_save(self):
        email = "abc@example.com"
        user = User.objects.create_user(email, email)
        list = ToDoList.objects.create(name="Test", owner=user)
        todo = ToDo.objects.create(text="World Domination", list=list)
        self.assertFalse(todo.complete)
        self.assertEquals(None, todo.completion_datetime)
        now = datetime.datetime.now()
        todo.complete = True
        todo.save()
        self.assertTrue(todo.complete)
        self.assertTrue(timedelta(seconds=2) > (now - todo.completion_datetime))

    def test_clearing_on_save(self):
        email = "abc@example.com"
        user = User.objects.create_user(email, email)
        list = ToDoList.objects.create(name="Test", owner=user)
        todo = ToDo.objects.create(text="World Domination", list=list)
        self.assertFalse(todo.complete)
        self.assertEquals(None, todo.completion_datetime)
        todo.complete = True
        todo.save()
        todo.complete = False
        todo.save()
        self.assertFalse(todo.complete)
        self.assertTrue(todo.completion_datetime is None)
