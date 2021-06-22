from django.db import models
from django.conf import settings
from django.db.models.fields import CharField
# Create your models here.

User = settings.AUTH_USER_MODEL

class Movie(models.Model):
    tmdb_id = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=100, null=True)
    poster_path = models.CharField(max_length=200, null=True)
    backdrop_path = models.CharField(max_length=200, null=True)
    like_users = models.ManyToManyField(User, related_name='like_movies')


class Comment(models.Model):
    like_users = models.ManyToManyField(User, related_name='like_comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ReComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='recomments')
    content = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class RatedMovie(models.Model):
    # jisu => 1번 영화 5점
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rated_movies')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='rates')
    rate = models.IntegerField()

