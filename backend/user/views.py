from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from helpers.helpers import BaseResponse
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
        response = BaseResponse()
        try:
            json_data = request.data

            username = json_data.get('username', None)
            password = json_data.get('password', None)

            user = User.objects.filter(username=username)

            if user is None:
                response.data_message = "User not exists"
                return response.json()

            user = authenticate(request, username=username, password=password)

            if user:
                login(request, user)
                response.data_message = "Login Succesfully"
                return response.json()
            else:
                response.data_message = "Login Failed"
                return response.json()
        except Exception as e:
            print(e)

class Register(ViewSet):
    def create(self, request):
        response = BaseResponse()
        try:
            json_data = request.data
            first_name = json_data.get('first_name', None)
            last_name = json_data.get('last_name', None)
            username = json_data.get('username', None)
            password = json_data.get('password', None)
            email = json_data.get('email', None)

            user = User.objects.filter(username=username)

            if user:
                response.data_message = "Already exists"
                return response.json()
            

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
                response.data_message = "Register Succesfully"
                return response.json()
            else:
                response.data_message = "Try Again"
                return response.json()
        except Exception as e:
            print(e)


class ConfirmOtp(ViewSet):
    def create(self, request):
        response = BaseResponse()
        try:
            json_data = request.data
            print(json_data)
            username = json_data.get("username", None)
            print(username)
            otp = json_data.get("otp", None)

            if otp and username:
                profile = Profile.objects.get(user__username=username)

                if profile:
                    if int(otp) == profile.otp:
                        is_otp_verified = True
                        data = {"is_otp_verified": is_otp_verified}
                        serializer = ProfileSerializer(profile, data=data, partial=True)

                        if serializer.is_valid():
                            serializer.save()
                            response.data_message = "Verify Succesfully"
                            return response.json()
                    else:
                        response.data_message = "Wrong OTP"
                        return response.json()
                else:
                    response.data_message = "User Doesn't exists" 
                    return response.json()
            else:
                response.data_message = "Something Went Wrong" 
                return response.json()
        except Exception as e:
            print(e)


class ForgetPassword(ViewSet):
    def create(self, request):
        response = BaseResponse()
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
                    response.data_message = "Password doesn't match" 
                    return response.json()
                else:
                    response.data_message = "Password match" 
                    return response.json()

            if is_check_username:
                if user:
                    response.data_message = "User exists" 
                    return response.json()
                else:
                    response.data_message = "User not exists" 
                    return response.json()
                
            if is_reset_password:
                if user:
                    data = {"password": new_password}
                    serializer = UserSerializer(user, data=data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                    response.data_message = "Reset Password Succesfully" 
                    return response.json()
                else:
                    response.data_message = "User not exists" 
                    return response.json()
        except Exception as e:
            print(e)

    