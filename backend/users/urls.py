from django.urls import path
from .views import register_user, get_user_profile, CustomTokenObtainPairView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('profile/', get_user_profile, name='profile'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
]

