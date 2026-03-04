from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout





@api_view(['GET'])
def user_list(request):

    users = User.objects.all()

    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)

        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'Registration successful'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])  # Anyone can login
def login_view(request):
    """
    Login an existing user.
    POST request with username and password
    """
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        token, created = Token.objects.get_or_create(user=user)
        
        login(request, user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'Login successful'
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_view(request):
    """
    Logout user by deleting their token.
    """
    # Delete the token so it can't be used anymore
    request.user.auth_token.delete()
    
    # Clear session
    logout(request)
    
    return Response({
        'message': 'Logout successful'
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Must be logged in
def me(request):
    """
    Get the currently logged in user's info.
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# accounts/views.py - add this new view

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_dashboard(request):
    """
    Example of a role-specific view.
    Only students can access this.
    """
    if request.user.role != 'STUDENT':
        return Response({
            'error': 'Only students can access this'
        }, status=status.HTTP_403_FORBIDDEN)
    
    return Response({
        'message': f'Welcome student {request.user.username}!',
        'student_data': {
            'total_logs': 0,  # We'll add real data later
            'pending_tasks': 0
        }
    })
# Create your views here.
