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

