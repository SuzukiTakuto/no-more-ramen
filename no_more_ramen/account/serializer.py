from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from .models import User


class UpdateUserSerializer(serializers.Serializer):
    sex = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    icon_id = serializers.IntegerField(required=False, allow_null=True)
    send_report = serializers.BooleanField(required=False, default=None, allow_null=True)

    def validate(self, attrs):
        if attrs.get("sex") in (None, "male", "female", "other") is False:
            raise serializers.ValidationError({"sex": "Please enter the correct value."})
        if attrs.get("icon_id") in (None, 0, 1, 2) is False:
            raise serializers.ValidationError({"icon_id": "Please enter the correct value."})

        return attrs

    def update(self, instance, validated_data):
        if validated_data.get("sex") is not None:
            instance.sex = validated_data.get("sex")
        if validated_data.get("icon_id") is not None:
            instance.icon_id = validated_data.get("icon_id")
        if validated_data.get("send_report") is not None:
            instance.send_report = validated_data.get("send_report")
        instance.save()

        return instance

    def create(self, validated_data):
        return None


class CreateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    sex = serializers.ChoiceField(["male", "female", "other"], required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', "sex")

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password2": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            sex=validated_data["sex"],
        )
        user.set_password(validated_data['password'])
        user.is_active = False
        user.save()

        return user
