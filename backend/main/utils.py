from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from django.template.loader import render_to_string
import logging

logger = logging.getLogger(__name__)
User = get_user_model()


def send_welcome_email(user_id):
    try:
        user = User.objects.get(id=user_id)
        subject = 'Добро пожаловать на мой сайт'
        html_content = render_to_string('welcome_email.html', {'user': user})
        send_mail(
            subject,
            '',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            html_message=html_content,
            fail_silently=False,
        )
        logging.info(f'Welcome email sent to user: {user.username}')
    except Exception as e:
        logger.error(f'Failed to send welcome email: {e}')


def send_admin_notification_new_user(user_id):
    try:
        user = User.objects.get(id=user_id)
        subject = 'Новый пользователь зарегистрирован'
        body = f'Пользователь {user.username} успешно зарегистрировался и активировал аккаунт.'
        send_mail(
            subject,
            body,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],
            fail_silently=False,
        )
        logging.info(f'Admin notification sent for new user: {user.username}')
    except Exception as e:
        logger.error(f'Failed to send admin notification for new user: {e}')
