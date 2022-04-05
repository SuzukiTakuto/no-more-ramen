from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.core.signing import BadSignature, SignatureExpired, loads, dumps
from django.template.loader import render_to_string
from django.db import transaction

from rest_framework import views, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializer import CreateUserSerializer, UpdateUserSerializer

User = get_user_model()


class CreateUser(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        """仮登録と本登録用のメールの発行"""
        serializer = CreateUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user = User.objects.get(email=request.data["email"])
        domain = "localhost:3000"
        context = {
            'protocol': "http",
            'domain': domain,
            'token': dumps(user.username),
            'username': user.username,
        }

        subject = render_to_string('accounts/mail_template/create/subject.txt', context)
        message = render_to_string('accounts/mail_template/create/message.txt', context)
        from_email = 'nikkii.official126@gmail.com'

        user.email_user(subject, message, from_email)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CreateUserComplete(views.APIView):
    """メール内URLアクセス後のユーザー本登録"""
    timeout_seconds = getattr(settings, 'ACTIVATION_TIMEOUT_SECONDS', 60 * 60 * 24)  # デフォルトでは1日以内
    permission_classes = [AllowAny]

    def get(self, request, **kwargs):
        """tokenが正しければ本登録."""
        token = kwargs.get('token')
        try:
            user_pk = loads(token, max_age=self.timeout_seconds)

        # 期限切れ
        except SignatureExpired:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # tokenが間違っている
        except BadSignature:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # tokenは問題なし
        else:
            try:
                user = User.objects.get(pk=user_pk)
            except User.DoesNotExist:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                if not user.is_active:
                    # 問題なければ本登録とする
                    user.is_active = True
                    user.save()
                    token = RefreshToken.for_user(user)
                    token.blacklist()
                    return Response(data={"token", token}, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        token = RefreshToken.for_user(request.user)
        token.blacklist()
        return Response({"username": request.user.username}, status=status.HTTP_205_RESET_CONTENT)


class UserInformationView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        context = {
            "username": user.username,
            "email": user.email,
            "icon_id": user.icon_id,
            "sex": user.sex
        }

        return Response(context, status=status.HTTP_200_OK)


class UpdateUserView(views.APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UpdateUserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
