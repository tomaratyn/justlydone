#!/usr/bin/env python
import os
import sys
from pprint import pprint

pprint(sys.path)

if __name__ == "__main__":

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main_project_settings.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
