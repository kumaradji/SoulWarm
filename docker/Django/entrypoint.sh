#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Ждем запуска БД..."

    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done

    echo "База запущена!"
fi

python manage.py collectstatic --noinput
python manage.py migrate --noinput
python manage.py loaddata main/fixtures/initial_data.json
echo "from django.contrib.auth.models import User;
User.objects.filter(email='$DJANGO_ADMIN_EMAIL').delete();
User.objects.create_superuser('$DJANGO_ADMIN_USER', '$DJANGO_ADMIN_EMAIL', '$DJANGO_ADMIN_PASSWORD')" | python manage.py shell

exec "$@"