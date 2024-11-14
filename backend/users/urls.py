from django.urls import path
from .views import register_user, get_user_profile, CustomTokenObtainPairView, CookieTokenRefreshView, check_authentication, logout_view

urlpatterns = [
    path('register/', register_user, name='register'),
    path('profile/', get_user_profile, name='profile'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('check-authentication/', check_authentication, name='check_authentication'),
    path('logout/', logout_view, name='logout'),
    path('get-user-profile/', get_user_profile, name='user_rofile')
]

