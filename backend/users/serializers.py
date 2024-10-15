from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

# Serializer for users
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_verified', 'profile_picture', 'phone_number']

# Serializer for Registering
class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

# Serializer for Logging in
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims, such as username, email, etc.
        token['username'] = user.username
        token['email'] = user.email

        return token

    def validate(self, attrs):
        # Retrieve username and password from attrs
        username = attrs.get('username')
        password = attrs.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)

        if user is None:
            # If authentication fails, raise a validation error
            raise serializers.ValidationError("Invalid username or password.")
        
        # If user is authenticated, call the superclass method to create the token
        return super().validate(attrs)