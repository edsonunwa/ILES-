from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

@api_view(['GET'])
def user_list(request):

    users = User.objects.all()

    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)



# Create your views here.
