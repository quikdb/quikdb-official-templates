from django.http import JsonResponse
from django.urls import path

def home(_request):
    return JsonResponse({'message': 'Your QuikDB Django application is live.'})

def health(_request):
    return JsonResponse({'ok': True, 'marker': 'quikdb-template-django-web-v1'})

urlpatterns = [path('', home), path('health', health)]
