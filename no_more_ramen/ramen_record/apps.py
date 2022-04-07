from django.apps import AppConfig


class RamenRecordConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ramen_record'

    def ready(self):
        from .scheduler import start
        start()
