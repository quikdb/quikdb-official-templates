# Django web

Django 5 starter served by gunicorn with `/health` and a non-root runtime. The starter has a safe
build-only key; customers should add `SECRET_KEY` through QuikDB environment settings before adding
sessions or private data. QuikDB exposes container port 8000.
