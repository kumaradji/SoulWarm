#!/bin/sh

# Применяем миграции базы данных
python3 manage.py migrate --noinput

# Запускаем сервер Gunicorn
gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
