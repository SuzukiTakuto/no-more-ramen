from django.urls import path
from .apis import UserParameterView, RamenCalenderView, CreateRamenRecordView, RamenRankView

app_name = 'ramen_record'
urlpatterns = [
    path('create/', CreateRamenRecordView.as_view(), name='crete_ramen_record'),
    path('calender/', RamenCalenderView.as_view(), name='ramen_record_calender'),
    path('parameters/', UserParameterView.as_view(), name='user_parameters'),
    path('rank/', RamenRankView.as_view(), name="ramen_rank")
]
