# urls.py в приложении main
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    UserRegistrationView, UserLoginView, ResetPasswordView, ChangePasswordView,
    UserProfileView, ActivateUser, landing_page, category_list, category_detail, product_list, product_detail,
    UserDetailView, AvatarUpdateView, MessageListView, MessageCreateView,
    CartListView, CartCreateView, TelegramWebhookView, VIPMessageListView, VIPMessageCreateView, LongPollingMessageView,
    CartRemoveView, verify_token
)

urlpatterns = [
    path('', landing_page, name='landing_page'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('user/', UserDetailView.as_view(), name='user_detail'),
    path('profile/avatar/', AvatarUpdateView.as_view(), name='avatar-update'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('activate/<str:token>/', ActivateUser.as_view(), name='activate_user'),
    path('categories/', category_list, name='category_list'),
    path('categories/<int:category_id>/', category_detail, name='category_detail'),

    path('products/', product_list, name='product_list'),
    path('products/<int:product_id>/', product_detail, name='product_detail'),

    path('messages/', MessageListView.as_view(), name='message-list'),
    path('messages/create/', MessageCreateView.as_view(), name='message-create'),
    path('telegram-webhook/', TelegramWebhookView.as_view(), name='telegram-webhook'),
    path('long-polling/messages/', LongPollingMessageView.as_view(), name='long_polling_messages'),

    path('vip-messages/', VIPMessageListView.as_view(), name='vip-message-list'),
    path('vip-messages/create/', VIPMessageCreateView.as_view(), name='vip-message-create'),

    path('cart/', CartListView.as_view(), name='cart-list'),
    path('cart/create/', CartCreateView.as_view(), name='cart-create'),
    path('cart/remove/<int:item_id>/', CartRemoveView.as_view(), name='cart-remove'),
    path('verify-token/', verify_token, name='verify_token'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
