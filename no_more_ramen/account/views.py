from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.core.signing import BadSignature, SignatureExpired, loads, dumps
from django.http import HttpResponseBadRequest
from django.shortcuts import redirect
from django.shortcuts import render
from django.template.loader import render_to_string

from rest_framework import generics

from .serializer import UserSerializer

User = get_user_model()


class UserCreate(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request)
        """仮登録と本登録用のメールの発行"""
        user = request.data["username"]
        user.is_active = False
        user.save()

        # アクティベーションURLの送付
        current_site = get_current_site(self.request)
        domain = current_site.domain
        context = {
            'protocol': self.request.scheme,
            'domain': domain,
            'token': dumps(user.pk),
            'username': user.username,
        }

        subject = render_to_string('accounts/mail_template/create/subject.txt', context)
        message = render_to_string('accounts/mail_template/create/message.txt', context)
        from_email = 'nikkii.official126@gmail.com'

        user.email_user(subject, message, from_email)
        return redirect('accounts:user_create_done', username=user.username)


class UserCreateComplete(generic.TemplateView):
    """メール内URLアクセス後のユーザー本登録"""
    timeout_seconds = getattr(settings, 'ACTIVATION_TIMEOUT_SECONDS', 60 * 60 * 24)  # デフォルトでは1日以内

    def get(self, request, **kwargs):
        """tokenが正しければ本登録."""
        token = kwargs.get('token')
        try:
            user_pk = loads(token, max_age=self.timeout_seconds)

        # 期限切れ
        except SignatureExpired:
            return HttpResponseBadRequest()

        # tokenが間違っている
        except BadSignature:
            return HttpResponseBadRequest()

        # tokenは問題なし
        else:
            try:
                user = User.objects.get(pk=user_pk)
            except User.DoesNotExist:
                return HttpResponseBadRequest()
            else:
                if not user.is_active:
                    # 問題なければ本登録とする
                    user.is_active = True
                    user.name = user.username
                    user.save()
                    return render(request, 'registration/user_create_complete.html', {'user': user})

        return HttpResponseBadRequest()
