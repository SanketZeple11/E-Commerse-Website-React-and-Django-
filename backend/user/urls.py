from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

router = DefaultRouter()
router.register(r'health-check', HealthCheck, basename='HealthCheck')
router.register(r'login', Login, basename='Login')
router.register(r'register', Register, basename='Register')
router.register(r'verify-otp', ConfirmOtp, basename='VerifyOTP')
router.register(r'forget-password', ForgetPassword, basename='ForgetPassword')

urlpatterns = [
    path('', include(router.urls)),
]