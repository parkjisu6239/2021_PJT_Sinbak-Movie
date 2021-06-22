from django.contrib.auth import get_user_model
from accounts import serializers
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_406_NOT_ACCEPTABLE,
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED
)
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    UserSerializer, 
    UserChangeSerializer, 
    UserRatedMovieSerializer,
    UserLikedMovieSerializer,
)

from .forms import CustomUserChangeForm


# Create your views here.
@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    password_confirmation = request.data.get('password_confirmation')

    if password != password_confirmation:
        return Response({'err': '비밀번호가 일치하지 않습니다.'}, HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        print(serializer)
        return Response(serializer.data, HTTP_201_CREATED)



@api_view(['GET','PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_update_delete(request):
    if request.method == 'GET':
        user = request.user
        data = {
            'username': user.username,
            'last_name': user.last_name,
            'first_name': user.first_name,
            'email': user.email,
            'profile_image': str(user.profile_image),
        }
        return Response(data)

    elif request.method == 'PUT':
        print(request.data)
        print(request.FILES)
        form = CustomUserChangeForm(request.data, request.FILES, instance=request.user)
        # print(form.errors) // 에러 시, html로 에러메세지를 보여줍니다.
        if form.is_valid():
            user = form.save()
            data= {
                'last_name': user.last_name,
                'first_name': user.first_name,
                'email': user.email,
                'profile_image': str(user.profile_image),
            }
            return Response(data, status=HTTP_201_CREATED)
        return Response(status=HTTP_406_NOT_ACCEPTABLE)

    elif request.method == 'DELETE':
        request.user.delete()
        return Response({'data': '회원정보가 삭제되었습니다'})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def user_password_change(request):
    ### oldpassword 확인 필요!
    old_password = request.data['credentials']['old_password']
    new_password1 = request.data['credentials']['new_password1']
    new_password2 = request.data['credentials']['new_password2']

    if new_password1 != new_password2:
        return Response({'err': '비밀번호가 일치하지 않습니다.'}, HTTP_400_BAD_REQUEST)

    user = request.user
    user.set_password(new_password1)
    user.save()
    return Response({'data': '비밀번호가 변경되었습니다'})


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def follow(request, username):
    you = get_object_or_404(get_user_model(), username=username)

    follower_cnt = you.followers.count()
    following_cnt = you.followings.count()

    if request.method == 'POST':
        if request.user.username == username:
            return Response({'err': '팔로우 불가'}, HTTP_400_BAD_REQUEST)

        if you.followers.filter(pk=request.user.pk).exists():
            you.followers.remove(request.user)
            followed = False
            follower_cnt -= 1
        else:
            you.followers.add(request.user)
            followed = True
            follower_cnt += 1

    
    elif request.method == 'GET':
        if you.followers.filter(pk=request.user.pk).exists():
            followed = True
        else:
            followed = False

    data = {
        'followed': followed,
        'follower_cnt': follower_cnt,
        'following_cnt': following_cnt,
    }
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_superuser(request):
    if request.user.is_superuser:
        return Response({'data': 'YES'})
    else:
        return Response({'data': 'NO'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_movie_info(request, username):
    user = get_user_model().objects.get(username=username)
    serializer1 = UserRatedMovieSerializer(user.rated_movies.all(), many=True)
    serializer2 = UserLikedMovieSerializer(user.like_movies.all(), many=True)
    data = {
        'profile_image': str(user.profile_image)
    }
    return Response([serializer1.data, serializer2.data, data])