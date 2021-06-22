from re import T
from rest_framework import status
from rest_framework import response
from movies import serializers
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
    HTTP_406_NOT_ACCEPTABLE,
)
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from .models import Movie, Comment, RatedMovie, ReComment
from .serializers import (
    CommentListSerializer,
    CommentSerializer,
    RatedMovieSerializer,
    ReCommentListSerializer,
    ReCommentSerializer
)
import requests
from django.db.models import Avg
# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def comment_list_create(request, tmdb_id):
    movie = Movie.objects.get(tmdb_id=tmdb_id)
    if request.method == 'GET':
        comments = movie.comments.all()
        serializer = CommentListSerializer(comments, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    elif request.method == 'POST':
        if movie.title == None:
            api_key = 'ec0f1648e3203531927d5fa02646eb35'
            URL = f'https://api.themoviedb.org/3/movie/{tmdb_id}?api_key={api_key}'
            response = requests.get(URL)
            result = response.json()
            movie.title = result.get('title')
            movie.poster_path = result.get('potser_path')
            movie.save()
        else:
            movie = get_object_or_404(Movie, tmdb_id=tmdb_id)
        
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, movie=movie)
        return Response(serializer.data, status=HTTP_201_CREATED)
        

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])      
def comment_update_delete(request, tmdb_id, comment_id):
    if request.method == 'DELETE':
        comment = get_object_or_404(Comment, pk=comment_id)
        comment.delete()
        return Response({'data': f'{comment_id}번 댓글이 삭제되었습니다.'}, status=HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        comment = get_object_or_404(Comment, pk=comment_id)
        serializer = CommentSerializer(comment, data=request.data)
        print(request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def movie_like(request, tmdb_id):
    movie = Movie.objects.get(tmdb_id=tmdb_id)
    if movie.title == None:
        movie.title = request.data['title']
        movie.poster_path = request.data['poster_path']
        movie.backdrop_path = request.data['backdrop_path']
        movie.save()
    if movie.like_users.filter(pk=request.user.id).exists(): # 좋아요 취소
        movie.like_users.remove(request.user)
        liked = False
    else: # 좋아요 눌렀어
        movie.like_users.add(request.user)
        liked = True

    data = {
        'liked': liked,
        'count': movie.like_users.count()
    }
    return Response(data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated]) 
def comment_like(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    if request.method == 'GET':
        if comment.like_users.filter(pk=request.user.id).exists(): # 좋아요 취소
            liked = True
        else: # 좋아요 눌렀어
            liked = False
    elif request.method == 'POST':
        if comment.like_users.filter(pk=request.user.id).exists(): # 좋아요 취소
            comment.like_users.remove(request.user)
            liked = False
        else: # 좋아요 눌렀어
            comment.like_users.add(request.user)
            liked = True

    data = {
        'liked': liked,
        'count': comment.like_users.count()
    }
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_best_comment(request, tmdb_id):
    movie = Movie.objects.get(tmdb_id=tmdb_id)
    comments = movie.comments.all()
    serializer = CommentListSerializer(comments, many=True)
    return Response(serializer.data, status=HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_initial_movie_info(request, tmdb_id):
    movie = Movie.objects.get(tmdb_id=tmdb_id)
    if movie.backdrop_path == None:
        movie.title = request.data['title']
        movie.poster_path = request.data['poster_path']
        movie.backdrop_path = request.data['backdrop_path']
        movie.save()
    
    if movie.backdrop_path == None:
        return Response(status=HTTP_406_NOT_ACCEPTABLE)

    return Response(status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_backdrop(request, tmdb_id):
    movie = Movie.objects.get(tmdb_id=tmdb_id)
    if movie.backdrop_path:
        data= {
            'backdrop_path': movie.backdrop_path,
            'title': movie.title,
        }
        print(data)
        return Response(data, status=HTTP_200_OK)
    else:
        data= {
            'msg': '데이터가 존재하지 않습니다.'
        }
        return Response(data, status=HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def movie_rate(request, tmdb_id):
    movie = Movie.objects.get(tmdb_id=tmdb_id)
    if movie.title == None:
        movie.title = request.data['title']
        movie.poster_path = request.data['poster_path']
        movie.backdrop_path = request.data['backdrop_path']
        movie.save()

    if RatedMovie.objects.filter(user=request.user, movie=movie).exists():
        rated_movie = RatedMovie.objects.get(user=request.user, movie=movie)
        serializer = RatedMovieSerializer(instance=rated_movie, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    else:
        serializer = RatedMovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, movie=movie)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def recomment_list_create(request, comment_id):
    if request.method == 'GET':
        comment = get_object_or_404(Comment, pk=comment_id)
        recomments = comment.recomments.all()
        serializer = ReCommentListSerializer(recomments, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    elif request.method == 'POST':
        comment = get_object_or_404(Comment, pk=comment_id)
        serializer = ReCommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, comment=comment)
        return Response(serializer.data, status=HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def recomment_delete(request, comment_id, recomment_id):
    if request.method == 'DELETE':
        recomment = get_object_or_404(ReComment, pk=recomment_id)
        recomment.delete()
        return Response({'data': f'{recomment_id}번 대댓글이 삭제되었습니다.'}, status=HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_like_rate(request, tmdb_id):
    if Movie.objects.filter(tmdb_id=tmdb_id).exists():
        movie = Movie.objects.get(tmdb_id=tmdb_id)

        if movie.like_users.filter(pk=request.user.id).exists(): # 좋아요 취소
            liked = True
        else: # 좋아요 눌렀어
            liked = False

        avg = RatedMovie.objects.filter(movie=movie).aggregate(Avg('rate'))
        if RatedMovie.objects.filter(user=request.user, movie=movie).exists():
            rated_movie = RatedMovie.objects.get(user=request.user, movie=movie)
            serializer = RatedMovieSerializer(rated_movie)
            data = {
                'liked': liked,
                'rate': serializer.data['rate'],
                'count': movie.like_users.count(),
                'rate_avg': avg['rate__avg'],
            }
            return Response(data)
        else:
            data = {
                'liked': liked,
                'rate': 0,
                'count': movie.like_users.count(),
                'rate_avg': avg['rate__avg'],
            }
            return Response(data)
    else:
        movie = Movie.objects.create(tmdb_id=tmdb_id)
        data = {
            'liked': False,
            'rate': 0,
            'count': movie.like_users.count(),
            'rate_avg': 0,
        }
        return Response(data)
