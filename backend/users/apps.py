from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    # Import signals to trigger profile creation
    def ready(self):
        import users.signals  
