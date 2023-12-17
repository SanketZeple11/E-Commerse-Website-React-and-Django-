from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.status import *
from django.contrib.auth import login, logout, authenticate
from .serializers import UserSerializer
from django.contrib.auth.models import User

# Create your views here.

class HealthCheck(ViewSet):
    def list(self, request):
        return Response("Health Checked")

class Login(ViewSet):
    def create(self, request):
        json_data = request.data

        username = json_data.get('username', None)
        password = json_data.get('password', None)

        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return Response("Login Succesfully", HTTP_200_OK)
        else:
            return Response("Login Failed", HTTP_401_UNAUTHORIZED)

class Register(ViewSet):
    def create(self, request):
        print("dfsdf")
        json_data = request.data
        first_name = json_data.get('first_name', None)
        last_name = json_data.get('last_name', None)
        username = json_data.get('username', None)
        password = json_data.get('password', None)

        user_data = {
            "first_name": first_name,
            "last_name": last_name,
            "username": username,
            "password": password

        }

        serializer = UserSerializer(data=user_data)

        if serializer.is_valid():
            serializer.save()
            return Response("Register Succesfully", HTTP_200_OK)
        else:
            return Response("Try Again", HTTP_400_BAD_REQUEST)


