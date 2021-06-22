from django.db.models import fields
from rest_framework import serializers
from .models import Comment, RatedMovie, ReComment

class CommentListSerializer(serializers.ModelSerializer):
    # https://velog.io/@oen/SerializerMethodField-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C-%EB%B2%88%EC%97%AD
    username = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    recomment_count = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()
    movie_rate = serializers.SerializerMethodField()
    
    # 이건 read_only
    # get_<field_name>으로 메서드 생성
    # self => instance, obj => Model
    def get_username(self, obj):
        return obj.user.username

    def get_likes_count(self, obj):
        return obj.like_users.count()
    
    def get_recomment_count(self, obj):
        return obj.recomments.count()

    def get_profile_image(self, obj):
        return str(obj.user.profile_image)

    def get_movie_rate(self, obj):
        if obj.user.rated_movies.filter(movie=obj.movie).exists():
            return obj.user.rated_movies.get(movie=obj.movie).rate
        else:
            return 0
    
    class Meta:
        model = Comment
        fields = (
            'id',
            'content', 
            'created_at', 
            'updated_at', 
            'movie', 
            'user', 
            'username',
            'likes_count',
            'recomment_count',
            'profile_image',
            'movie_rate',
        )

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('content',)



class ReCommentListSerializer(serializers.ModelSerializer):
    # https://velog.io/@oen/SerializerMethodField-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C-%EB%B2%88%EC%97%AD
    username = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()

    # 이건 read_only
    # get_<field_name>으로 메서드 생성
    # self => instance, obj => Model
    def get_username(self, obj):
        return obj.user.username
    
    def get_profile_image(self, obj):
        return str(obj.user.profile_image)

    class Meta:
        model = ReComment
        fields = (
            'id',
            'content', 
            'created_at', 
            'updated_at', 
            'comment', 
            'user', 
            'username',
            'profile_image',
        )

class ReCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReComment
        fields = ('content',)




class RatedMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatedMovie
        fields = ('rate',)
