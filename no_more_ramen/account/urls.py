from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .apis import CreateUserView, CreateUserCompleteView, LogoutView, UserInformationView, UpdateUserView

app_name = 'account'
urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('create/', CreateUserView.as_view(), name='create_user'),
    path('create/complete/<token>', CreateUserCompleteView.as_view(), name='create_user_complete'),
    path('information/', UserInformationView.as_view(), name='user_information'),
    path('update/', UpdateUserView.as_view(), name='update_user')
]
