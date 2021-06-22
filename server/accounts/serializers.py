from django.db import models
from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import RatedMovie, Movie

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('username', 'password',)


class UserChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'profile_image',)


class UserRatedMovieSerializer(serializers.ModelSerializer):
    poster_path = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    tmdb_id = serializers.SerializerMethodField()
    
    # 이건 read_only
    # get_<field_name>으로 메서드 생성
    # self => instance, obj => Model
    def get_poster_path(self, obj):
        return obj.movie.poster_path

    def get_title(self, obj):
        return obj.movie.title

    def get_tmdb_id(self, obj):
        return obj.movie.tmdb_id

    class Meta:
        model = RatedMovie
        fields = ('poster_path', 'tmdb_id', 'title', 'rate',)

class UserLikedMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('poster_path', 'tmdb_id', 'title')

