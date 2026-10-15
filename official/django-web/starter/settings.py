import os
import secrets

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# One-click deployments need no customer secret. Generate a process-lifetime key when a persistent
# key is not supplied; gunicorn preloads this module once so every worker inherits the same value.
SECRET_KEY = os.environ.get('SECRET_KEY') or secrets.token_urlsafe(48)
DEBUG = False
ALLOWED_HOSTS = ['*']
ROOT_URLCONF = 'starter.urls'
MIDDLEWARE = ['django.middleware.security.SecurityMiddleware']
INSTALLED_APPS = []
TEMPLATES = []
WSGI_APPLICATION = 'starter.wsgi.application'
