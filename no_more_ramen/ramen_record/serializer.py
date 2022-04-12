from rest_framework import serializers
from django.utils import timezone

from .models import RamenRecord


class Calorie:
    type = {"Miso": 510, "Shio": 470, "Shoyu": 470, "Tonkotsu": 500,
            "Jiro": 1500, "AburaSoba": 500, "Iekei": 800, "Tsukemen": 550}
    volume = {"large": 1.3, "medium": 1.0, "small": 0.7}
    rice = 250

    @classmethod
    def calculate(cls, data):
        calorie = cls.type.get(data["type"])
        calorie *= cls.volume.get(data["volume"])
        if data["rice"]:
            calorie += cls.rice
        return calorie


class CreateRamenRecordSerializer(serializers.ModelSerializer):
    # type = serializers.ChoiceField(["Miso", "Shio", "Shoyu", "Tonkotsu", "Jiro", "AburaSoba", "IeKei", "Tsukemen"], required=True)
    type = serializers.CharField(required=True)
    # volume = serializers.ChoiceField(["large", "medium", "small"], required=True)
    volume = serializers.CharField(required=True)
    rice = serializers.BooleanField(required=True)
    date_time = serializers.CharField()

    class Meta:
        model = RamenRecord
        exclude = ["owner", "calorie"]

    def create(self, validated_data):
        owner = self.context.get("user")
        calorie = Calorie.calculate(validated_data)
        date_format = "%Y/%m/%d/%H:%M"
        if validated_data["date_time"] == '':
            date_time = timezone.now()
        else:
            date_time = timezone.datetime.strptime(validated_data["date_time"], date_format)

        ramen = RamenRecord(
            owner=owner,
            type=validated_data["type"],
            volume=validated_data["volume"],
            rice=validated_data["rice"],
            date_time=date_time,
            calorie=calorie
        )
        ramen.save()
        owner.calorie_per_month += calorie
        owner.save()

        return ramen
