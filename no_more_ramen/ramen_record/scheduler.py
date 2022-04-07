from datetime import datetime, timedelta, time
from dateutil.relativedelta import relativedelta
from django.contrib.auth import get_user_model
from django.db.models import Sum
from django.template.loader import render_to_string
from apscheduler.schedulers.background import BackgroundScheduler

from .models import RamenRecord

User = get_user_model()


def send_report():
    target_users = User.objects.filter(send_report=True)
    now = datetime.now()
    first_date_last_month = datetime.combine(now.date() - timedelta(days=1) + relativedelta(days=1), time())
    for user in target_users:
        if RamenRecord.objects.filter(owner=user, date_time__range=[first_date_last_month, now]).exists():
            last_month_ramen_point = RamenRecord.objects.filter(owner=user,
                                                                date_time__range=[first_date_last_month, now]).aggregate(
                Sum("calorie"))
        else:
            last_month_ramen_point = 0
        context = {
            'username': user.username,
            'last_month_ramen_point': last_month_ramen_point
        }

        subject = render_to_string('ramen_report/subject.txt', context)
        message = render_to_string('ramen_report/message.txt', context)
        from_email = 'nikkii.official126@gmail.com'

        user.email_user(subject, message, from_email)


def start():
    """
    Scheduling data update
    Run update function once every 12 seconds
    """
    scheduler = BackgroundScheduler()

    scheduler.add_job(send_report, 'cron', day=1)  # schedule
    scheduler.start()
