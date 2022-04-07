import datetime
from dateutil.relativedelta import relativedelta

from django.contrib.auth import get_user_model
from django.db.models import Sum
from django.db import transaction

from rest_framework import views, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializer import CreateRamenRecordSerializer
from .models import RamenRecord
from rest_framework.response import Response

User = get_user_model()


class CalorieExpenditure:
    metabolism = {"male": 2200, "female": 1700, "other": 2000}
    walking_cal_per_km = {"male": 52, "female": 42, "other": 47}
    walking_cal_per_hour = {"male": 240, "female": 185, "other": 210}

    @classmethod
    def calculate(cls, calorie, sex):
        metabolism = calorie / cls.metabolism.get(sex)
        walking_cal_per_km = calorie / cls.walking_cal_per_km.get(sex)
        walking_cal_per_hour = calorie / cls.walking_cal_per_hour.get(sex)

        return metabolism, walking_cal_per_km, walking_cal_per_hour


class UserParameterView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        one_month = datetime.datetime.now() - datetime.timedelta(days=30)
        if RamenRecord.objects.filter(owner=request.user, datetime__range=[one_month, datetime.datetime.now()]).exists():
            month_calorie = RamenRecord.objects.filter(owner=request.user, datetime__range=[one_month, datetime.datetime.now()]).aggregate(Sum("calorie"))
        else:
            month_calorie = 0

        metabolism, walking_cal_per_km, walking_cal_per_hour = CalorieExpenditure.calculate(month_calorie, request.user.sex)

        context = {"status": 200, "ramen_point": month_calorie, "metabolism": format(metabolism, '.1f'),
                   "walking_cal_per_km": format(walking_cal_per_km, '.1f'),
                   "walking_cal_per_hour": format(walking_cal_per_hour, '.1f')}

        return Response(context, status=status.HTTP_200_OK)


class RamenCalenderView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        first_date_this_week = datetime.date.today() - relativedelta(days=datetime.date.today().weekday()) - datetime.timedelta(days=1)
        calender_date_matrix = [[first_date_this_week + datetime.timedelta(days=i) - datetime.timedelta(days=7*j) for i in range(7)] for j in range(5)]

        calender_max_range = datetime.datetime.now() - datetime.timedelta(days=35)
        if RamenRecord.objects.filter(owner=request.user, datetime__range=[calender_max_range, datetime.datetime.now()]).exists():
            ramen_date_list = [ramen["date_time"].date() for ramen in RamenRecord.objects.filter(owner=request.user, datetime__range=[calender_max_range, datetime.datetime.now()]).values("date_time")]
        else:
            ramen_date_list = []

        ramen_calender = [[date in ramen_date_list for date in week] for week in calender_date_matrix]
        context = {"status": 200}
        for i, ramen_week in enumerate(ramen_calender):
            context[f"{i+1}st_week"] = ramen_week

        return Response(context, status=status.HTTP_200_OK)


class CreateRamenRecordView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateRamenRecordSerializer
    queryset = RamenRecord.objects.all()

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        request.data["owner"] = request.user
        serializer = CreateRamenRecordSerializer(data=request.data)
        if serializer.is_valid() is False:
            serializer.errors["status"] = 400
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        ramen_object = serializer.save()

        return Response({"status": 201, "ramen_record_id": ramen_object.pk}, status=status.HTTP_201_CREATED)



