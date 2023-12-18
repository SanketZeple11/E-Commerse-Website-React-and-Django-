from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.status import *
from django.contrib.auth import login, logout, authenticate
from .serializers import UserSerializer, ProfileSerializer
from django.contrib.auth.models import User
from .models import Profile

# Create your views here.

class HealthCheck(ViewSet):
    def list(self, request):
        return Response("Health Checked")

class Login(ViewSet):
    def create(self, request):
        try:
            json_data = request.data

            username = json_data.get('username', None)
            password = json_data.get('password', None)

            user = User.objects.filter(username=username)

            if user is None:
                return Response("User not exists", HTTP_200_OK)

            user = authenticate(request, username=username, password=password)

            if user:
                login(request, user)
                return Response("Login Succesfully", HTTP_200_OK)
            else:
                return Response("Login Failed", HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)

class Register(ViewSet):
    def create(self, request):
        try:
            json_data = request.data
            first_name = json_data.get('first_name', None)
            last_name = json_data.get('last_name', None)
            username = json_data.get('username', None)
            password = json_data.get('password', None)
            email = json_data.get('email', None)

            user = User.objects.filter(username=username)

            if user:
                return Response("Already exists", HTTP_200_OK)
            

            user_data = {
                "first_name": first_name,
                "last_name": last_name,
                "username": username,
                "password": password,
                "email": email

            }

            serializer = UserSerializer(data=user_data)

            if serializer.is_valid():
                serializer.save()
                return Response("Register Succesfully", HTTP_200_OK)
            else:
                return Response("Try Again", HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)


class ConfirmOtp(ViewSet):
    def create(self, request):
        try:
            json_data = request.data
            username = json_data.get("username", None)
            otp = json_data.get("otp", None)

            if otp and username:
                profile = Profile.objects.get(user__username=username)
                if profile:
                    if otp == profile.otp:
                        is_otp_verified = True
                        data = {"is_otp_verified": is_otp_verified}
                        serializer = ProfileSerializer(profile, data=data, partial=True)
                        print(serializer)
                        if serializer.is_valid():
                            serializer.save()
                            return Response("Verify Succesfully", HTTP_200_OK)
                    else:
                        return Response("Wrong OTP", HTTP_400_BAD_REQUEST)
                else:
                    return Response("User Doesn't exists", HTTP_400_BAD_REQUEST)
            else:
                return Response("Something Went Wrong", HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)


class ForgetPassword(ViewSet):
    def create(self, request):
        try:
            json_data = request.data
            username = json_data.get("username", None)
            is_check_username = json_data.get("is_check_username", False)
            is_reset_password = json_data.get("is_reset_password", False)
            new_password = json_data.get("new_password", None)
            is_check_both_password = json_data.get("is_check_both_password", False)
            re_new_password = json_data.get("re_new_password", None)

            user = User.objects.get(username=username)

            if is_check_both_password:
                if new_password != re_new_password:
                    return Response("Password doesn't match", HTTP_200_OK)
                else:
                    return Response("Password match", HTTP_200_OK)

            if is_check_username:
                if user:
                    return Response("User exists", HTTP_200_OK)
                else:
                    return Response("User not exists", HTTP_200_OK)
                
            if is_reset_password:
                if user:
                    data = {"password": new_password}
                    serializer = UserSerializer(user, data=data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                    return Response("Reset Password Succesfully", HTTP_200_OK)
                else:
                    return Response("User not exists", HTTP_200_OK)
        except Exception as e:
            print(e)

    