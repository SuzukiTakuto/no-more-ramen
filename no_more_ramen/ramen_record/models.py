from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class RamenRecord(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='投稿ユーザー')

    type = models.CharField(
        _("Ramen type"),
        max_length=20
    )

    volume = models.CharField(
        _("Ramen volume"),
        max_length=10
    )

    rice = models.BooleanField(_("with or without rice"))

    date_time = models.DateTimeField(
        _("time ate"),
        auto_now_add=True
    )

    calorie = models.IntegerField(_("Estimated Calories in Ramen"))
