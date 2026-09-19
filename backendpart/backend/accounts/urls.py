from django.urls import path , include
from .views import register_view , User_list_view , Login_view , profile_view

urlpatterns = [
    path('',view=User_list_view),
    path('register/', view=register_view),
    path('login/', view=Login_view),
    path('profile/',view=profile_view)
]
