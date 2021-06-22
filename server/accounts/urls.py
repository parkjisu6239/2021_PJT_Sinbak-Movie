from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup),
    path('users/', views.user_update_delete),
    path('password-change/', views.user_password_change),
    path('<username>/follow/', views.follow),
    path('issuperuser/', views.is_superuser),
    path('<username>/user/movies/', views.user_movie_info),
]
