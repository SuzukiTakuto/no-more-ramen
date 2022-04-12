from datetime import datetime, timedelta, time, date
from django.contrib.auth import get_user_model
from django.db.models import Sum
from django.template.loader import render_to_string
from apscheduler.schedulers.background import BackgroundScheduler

from .models import RamenRecord

User = get_user_model()


def update_month_score():
    delete_score_date = date.today() - timedelta(days=31)
    target_records = RamenRecord.objects.filter(date_time__date=delete_score_date).values("calorie", "owner")
    for record in target_records:
        owner = record["owner"]
        owner.calorie_per_month -= record["calorie"]
        owner.save()


def send_report():
    target_users = User.objects.filter(send_report=True)
    now = datetime.now()
    first_date_last_month = now.date() - timedelta(days=1)
    first_date_last_month = first_date_last_month.replace(day=1)
    first_date_last_month = datetime.combine(first_date_last_month, time())
    print(now, first_date_last_month)
    for user in target_users:
        ramen_count = RamenRecord.objects.filter(owner=user, date_time__range=[first_date_last_month, now]).count()
        if ramen_count != 0:
            total_calorie = RamenRecord.objects.filter(owner=user,
                                                       date_time__range=[first_date_last_month, now]).aggregate(
                Sum("calorie")).get("calorie__sum")
        else:
            total_calorie = 0
        if total_calorie < 6000:
            comment = "野菜も食べて健康を維持しましょう！"
        elif total_calorie < 15000:
            comment = "少し食べすぎしれません。適度な運動をしましょう！"
        else:
            comment = "食べすぎです！ラーメンの頻度を減らしてください！"
        context = {
            'last_month': first_date_last_month.month,
            'username': user.username,
            'total_calorie': total_calorie,
            'ramen_count': ramen_count,
            'comment': comment
        }

        subject = render_to_string('ramen_report/subject.txt', context)
        message = render_to_string('ramen_report/message.txt', context)
        from_email = 'nikkii.official126@gmail.com'

        user.email_user(subject, message, from_email)


def start():
    scheduler = BackgroundScheduler()
    # send_report()

    scheduler.add_job(update_month_score, 'cron', hour=0)
    scheduler.add_job(send_report, 'cron', day=1)  # schedule
    scheduler.start()
