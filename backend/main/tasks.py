# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


@shared_task
def send_admin_notification(message):
    try:
        subject = subject = f'New message from {message.user.username}'
        body = f'User {message.user.username} sent a new message: {message.content}'

        # Логирование
        logging.info(f'Sending email with subject: {subject}')

        # Отправка email
        send_mail(
            subject,
            body,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],
            fail_silently=False,
        )

        logging.info('Email sent successfully')

    except Exception as e:
        logger.error(f'Failed to send email: {e}')


