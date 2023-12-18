from django.db import models
from base.models import BaseModel
from django.contrib.auth.models import User

class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    is_otp_verified =models.BooleanField(default=False)
    otp = models.IntegerField(null=True)
    profile_image = models.ImageField(upload_to='profile')



