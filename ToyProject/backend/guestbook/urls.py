from django.urls import path
from .views import *

urlpatterns = [
    path('guestbook/', guestbook_list_and_post, name='guestbook_list_and_post'),
    path('guestbook/<int:guestbook_id>/', guestbook_delete, name='guestbook_delete'),
]
