from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def save(self, **validated_data):
        # Extract the password from the validated data

        password = self.validated_data.get('password')
        # Call set_password to hash the password
        user = super().save(**validated_data)
        user.set_password(password)
        user.save()
        return user 
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
