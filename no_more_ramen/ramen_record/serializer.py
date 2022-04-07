from rest_framework import serializers

from .models import RamenRecord


class Calorie:
    type = {"Miso": 510, "Shio": 470, "Shoyu": 470, "Tonkotsu": 500,
            "Jiro": 1500, "AburaSoba": 500, "IeKei": 800, "Tsukemen": 550}
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
    type = serializers.ChoiceField(["Miso", "Shio", "Shoyu", "Tonkotsu", "Jiro", "AburaSoba", "IeKei", "Tsukemen"], required=True)
    volume = serializers.ChoiceField(["large", "medium", "small"], required=True)
    rice = serializers.BooleanField(required=True)
    date_time = serializers.DateTimeField(required=True)

    class Meta:
        model = RamenRecord
        exclude = ["owner", "calorie"]

    def create(self, validated_data):
        calorie = Calorie.calculate(validated_data.data)

        ramen = RamenRecord(
            owner=validated_data.data["owner"],
            type=validated_data.data["type"],
            volume=validated_data.data["volume"],
            rice=validated_data.data["rice"],
            date_time=validated_data.data["date_time"],
            calorie=calorie
        )
        ramen.save()

        return ramen
