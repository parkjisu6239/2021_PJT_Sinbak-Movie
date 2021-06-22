from django.urls import path
from . import views
urlpatterns = [
    path('<int:tmdb_id>/comment/', views.comment_list_create),
    path('<int:tmdb_id>/comment/<int:comment_id>/', views.comment_update_delete),
    path('<int:tmdb_id>/like/', views.movie_like,),
    path('comments/<int:comment_id>/like/', views.comment_like,),
    path('<int:tmdb_id>/rate/', views.movie_rate),
    path('<int:comment_id>/recomment/', views.recomment_list_create),
    path('<int:comment_id>/recomment/<int:recomment_id>/', views.recomment_delete),
    path('<int:tmdb_id>/like/rate/', views.get_like_rate),
    path('<int:tmdb_id>/comments/best/', views.get_best_comment),
    path('<int:tmdb_id>/', views.set_initial_movie_info),
    path('<int:tmdb_id>/backdrop/', views.get_backdrop),
]
