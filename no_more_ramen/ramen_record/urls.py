from django.urls import path
from .apis import UserParameterView, RamenCalenderView, CreateRamenRecordView

app_name = 'ramen_record'
urlpatterns = [
    path('create/', CreateRamenRecordView.as_view(), name='crete_ramen_record'),
    path('calender/', RamenCalenderView.as_view(), name='ramen_record_calender'),
    path('paremter/', UserParameterView.as_view(), name='user_parameter'),
    # path('rank/', )
]