# Django web

Django 6 starter served by gunicorn with `/health` and a non-root runtime. It generates one shared
process-lifetime signing key automatically. Customers should add a persistent `SECRET_KEY` through
QuikDB environment settings before adding sessions or private data. QuikDB exposes port 8000.
