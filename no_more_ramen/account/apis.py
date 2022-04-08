from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.signing import BadSignature, SignatureExpired, loads, dumps
from django.template.loader import render_to_string
from django.db import transaction

from rest_framework import views, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializer import CreateUserSerializer, UpdateUserSerializer

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid() is False:
            serializer.errors["status"] = 400
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()

        user = User.objects.get(email=request.data["email"])
        domain = "localhost:3000"
        context = {
            'protocol': "http",
            'domain': domain,
            'token': dumps(user.pk),
            'username': user.username,
        }

        subject = render_to_string('accounts/mail_template/create/subject.txt', context)
        message = render_to_string('accounts/mail_template/create/message.txt', context)
        from_email = 'nikkii.official126@gmail.com'

        user.email_user(subject, message, from_email)
        return Response({'status': 201, 'username': user.username}, status=status.HTTP_201_CREATED)


class CreateUserCompleteView(views.APIView):
    timeout_seconds = getattr(settings, 'ACTIVATION_TIMEOUT_SECONDS', 60 * 60 * 24)  # デフォルトでは1日以内
    permission_classes = [AllowAny]

    def get(self, request, **kwargs):
        token = kwargs.get('token')
        try:
            user_pk = loads(token, max_age=self.timeout_seconds)

        # 期限切れ
        except SignatureExpired:
            return Response({"status": 400, "error": "signature expired"}, status=status.HTTP_400_BAD_REQUEST)

        # tokenが間違っている
        except BadSignature:
            return Response({"status": 400, "error": "bad signature"}, status=status.HTTP_400_BAD_REQUEST)

        # tokenは問題なし
        else:
            try:
                user = User.objects.get(pk=user_pk)
            except User.DoesNotExist:
                return Response({"status": 400, "error": "user doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                if not user.is_active:
                    user.is_active = True
                    user.save()
                    token = RefreshToken.for_user(user)
                    token.blacklist()
                    return Response(data={"status": 200, "token": token}, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        refresh_token = request.data.get("access_token")
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(data={"status": 205, "username": request.user.username}, status=status.HTTP_205_RESET_CONTENT)


class UserInformationView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        context = {
            "status": 200,
            "username": user.username,
            "email": user.email,
            "icon_id": user.icon_id,
            "sex": user.sex,
            "send_report": user.send_report
        }

        return Response(context, status=status.HTTP_200_OK)


class UpdateUserView(views.APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UpdateUserSerializer(instance=user, data=request.data)
        if serializer.is_valid() is False:
            serializer.errors["status"] = 400
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({"status": 200, "username": user.username}, status=status.HTTP_200_OK)
