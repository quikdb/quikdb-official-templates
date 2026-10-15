import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = os.environ.get('SECRET_KEY', 'template-build-only-value')
DEBUG = False
ALLOWED_HOSTS = ['*']
ROOT_URLCONF = 'starter.urls'
MIDDLEWARE = ['django.middleware.security.SecurityMiddleware']
INSTALLED_APPS = []
TEMPLATES = []
WSGI_APPLICATION = 'starter.wsgi.application'
