from django.urls import path
from . import views

app_name = 'account'
urlpatterns = [
    path('login'),
    path('logout'),
    path('create_user'),
    path('user_information')
]
