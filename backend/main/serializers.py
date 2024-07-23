# serializers.py
from rest_framework import serializers
from .models import Category, EcoStaff, Profile, Activation, Cart, Message, VIPMessage, EcoStaffImage
from django.contrib.auth.models import User


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'user_name', 'content', 'timestamp', 'is_admin']


class VIPMessageSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = VIPMessage
        fields = ['id', 'user', 'content', 'timestamp', 'is_admin']


class EcoStaffImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = EcoStaffImage
        fields = ['image']

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url)


class EcoStaffSerializer(serializers.ModelSerializer):
    images = EcoStaffImageSerializer(many=True, read_only=True)
    category = serializers.StringRelatedField()

    class Meta:
        model = EcoStaff
        fields = ['id', 'title', 'description', 'content', 'price', 'category', 'images']


class CartSerializer(serializers.ModelSerializer):
    items = EcoStaffSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_cost']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['avatar']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class ActivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activation
        fields = ['user', 'token', 'created_at']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            is_active=False  # Устанавливаем пользователя как неактивного
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    currentPassword = serializers.CharField()
    newPassword = serializers.CharField()
