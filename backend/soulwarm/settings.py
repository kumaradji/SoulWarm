import os
from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent.parent

# Инициализация переменных окружения
env = environ.Env(
    DJANGO_ENV=(str, 'development'),
    DEBUG=(bool, False),
    SECRET_KEY=(str, 'default-secret-key'),
    DJANGO_ALLOWED_HOSTS=(list, []),
    DJANGO_ADMIN_USER=(str, 'admin'),
    DJANGO_ADMIN_EMAIL=(str, 'admin@example.com'),
    DJANGO_ADMIN_PASSWORD=(str, 'password'),
    EMAIL_HOST=(str, 'smtp.yandex.ru'),
    EMAIL_PORT=(int, 587),
    EMAIL_USE_TLS=(bool, True),
    EMAIL_HOST_USER=(str, ''),
    EMAIL_HOST_PASSWORD=(str, ''),
    DEFAULT_FROM_EMAIL=(str, ''),
    ADMIN_EMAIL=(str, ''),
    DATABASE=(str, 'sqlite'),
    DB_ENGINE=(str, 'django.db.backends.sqlite3'),
    DB_NAME=(str, os.path.join(BASE_DIR, "db.sqlite3")),
    DB_USER=(str, ''),
    DB_PASSWORD=(str, ''),
    DB_HOST=(str, ''),
    DB_PORT=(str, ''),
    VIP_TELEGRAM_BOT_TOKEN=(str, ''),
    VIP_TELEGRAM_CHAT_ID=(str, ''),
    GENERAL_TELEGRAM_BOT_TOKEN=(str, ''),
    GENERAL_TELEGRAM_CHAT_ID=(str, ''),
)

# Чтение файла .env
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# Определение PRODUCTION
PRODUCTION = env('DJANGO_ENV') == 'production'
if PRODUCTION:
    # Настройки для продакшена
    DEBUG = False
    # Другие продакшен-специфичные настройки
else:
    # Настройки для разработки
    DEBUG = True
    # Другие настройки для разработки

# Настройки для Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = env('EMAIL_HOST')
# EMAIL_PORT = env('EMAIL_PORT')
# EMAIL_USE_TLS = env('EMAIL_USE_TLS')
# EMAIL_HOST_USER = env('EMAIL_HOST_USER')
# EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
# DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL')
# ADMIN_EMAIL = env('ADMIN_EMAIL')

EMAIL_HOST = 'smtp.yandex.ru'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'koltsovaecoprint@yandex.ru'
EMAIL_HOST_PASSWORD ='uxftjmkthdxbgfsj'  # Пароль от почтового ящика
DEFAULT_FROM_EMAIL = 'koltsovaecoprint@yandex.ru'
ADMIN_EMAIL = 'kumaradji@me.com'

# Настройки для VIP Telegram бота
VIP_TELEGRAM_BOT_TOKEN = '7359625002:AAEkb7K0ZuK1TnxRNwuR1lv_L-CWPTfaN6E'
VIP_TELEGRAM_CHAT_ID = 707268574

# Настройки для General Telegram бота
GENERAL_TELEGRAM_BOT_TOKEN = '7289275372:AAGDhyO9xRWsO2s55qfcEjr-b0RKJXA2QMM'
GENERAL_TELEGRAM_CHAT_ID = 707268574

# Основные настройки
SECRET_KEY = env('SECRET_KEY')
ALLOWED_HOSTS = env('DJANGO_ALLOWED_HOSTS')

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=['http://localhost:3000'])
CORS_ALLOW_ALL_ORIGINS = env.bool('CORS_ALLOW_ALL_ORIGINS', default=False)
CORS_ALLOW_CREDENTIALS = True
SESSION_COOKIE_SAMESITE = 'Lax'  # или 'None' если используете HTTPS

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'drf_yasg',
    'main',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'main.middleware.DisableCSRFMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

ROOT_URLCONF = 'soulwarm.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'backend/main/templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'soulwarm.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Настройки интернационализации
LANGUAGE_CODE = 'ru'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Настройки статических файлов
STATIC_URL = '/backend_static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
