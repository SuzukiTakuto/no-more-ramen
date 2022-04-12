import datetime

from dateutil.relativedelta import relativedelta
from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models import Sum
from rest_framework import views, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import RamenRecord
from .serializer import CreateRamenRecordSerializer

User = get_user_model()


class CalorieExpenditure:
    metabolism = {"male": 2200, "female": 1700, "other": 2000}
    walking_cal_per_km = {"male": 52, "female": 42, "other": 47}
    walking_cal_per_hour = {"male": 240, "female": 185, "other": 210}

    @classmethod
    def calculate(cls, calorie, sex):
        print(calorie)
        metabolism = calorie / cls.metabolism.get(sex)
        walking_cal_per_km = calorie / cls.walking_cal_per_km.get(sex)
        walking_cal_per_hour = calorie / cls.walking_cal_per_hour.get(sex)

        return metabolism, walking_cal_per_km, walking_cal_per_hour


class UserParameterView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        one_month = datetime.datetime.now() - datetime.timedelta(days=30)
        if RamenRecord.objects.filter(owner=request.user, date_time__range=[one_month, datetime.datetime.now()]).exists():
            month_calorie = RamenRecord.objects.filter(owner=request.user, date_time__range=[one_month, datetime.datetime.now()]).aggregate(Sum("calorie")).get('calorie__sum')
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
        now = datetime.datetime.now()
        calender_max_range = now - datetime.timedelta(days=35)
        if RamenRecord.objects.filter(owner=request.user, date_time__range=[calender_max_range, now]).exists():
            ramen_date_list = [ramen["date_time"].date() for ramen in RamenRecord.objects.filter(owner=request.user, date_time__range=[calender_max_range, now]).values("date_time")]
        else:
            ramen_date_list = []
        ramen_calender = [[date in ramen_date_list for date in week] for week in calender_date_matrix]
        context = {"status": 200}
        for i, ramen_week in enumerate(ramen_calender):
            context[f"week{i+1}"] = ramen_week

        return Response(context, status=status.HTTP_200_OK)


class CreateRamenRecordView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateRamenRecordSerializer
    queryset = RamenRecord.objects.all()

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = CreateRamenRecordSerializer(data=request.data, context={"user": request.user})
        if serializer.is_valid() is False:
            return Response({"status": 400, "error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        ramen_object = serializer.save()

        return Response({"status": 201, "ramen_record_id": ramen_object.pk}, status=status.HTTP_201_CREATED)


class RamenRankView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        rank = User.objects.order_by("-calorie_per_month").values("username", "calorie_per_month", "icon_id")
        if len(rank) > 20:
            rank = rank[:20]
        user_rank = User.objects.filter(calorie_per_month__gte=user.calorie_per_month).count()

        return Response({"status": 200, "rank": rank, "my_rank": {"username": user.username, "rank": user_rank, "icon_id": user.icon_id, "calorie_per_month": user.calorie_per_month}})
