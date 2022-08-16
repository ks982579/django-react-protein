
from django.urls import path, include

# Import views
from .views import *

urlpatterns = [
    path('', home_page, name='home_page')
]