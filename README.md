```markdown
# ДушуГрею"

## Описание
Веб-приложение, созданное с использованием Django на серверной стороне и React на клиентской стороне. Проект включает в себя функциональность чатов для обычных пользователей и VIP-пользователей, а также мастер-классы и корзину для покупок.

## Установка
1. Клонировать репозиторий
2. Перейти в директорию проекта

### Установка зависимостей для Django

3. Создать виртуальное окружение и активировать его:
python -m venv venv
source venv/bin/activate  
# Для Windows используйте `venv\Scripts\activate`

4. Установить зависимости:
pip install -r requirements.txt

5. Применить миграции для настройки базы данных: 
python manage.py makemigrations
python manage.py migrate

6. Создать суперпользователя для доступа к административной панели:
python manage.py createsuperuser

### Установка зависимостей для React
7. Перейти в директорию клиента и установить зависимости:
cd frontend
npm install

## Запуск
### Запуск Redis
8. Запустить сервер Redis:
redis-server

### Запуск Celery
9. Запустить Celery для обработки фоновых задач:
celery -A soulwarm worker -l info

### Запуск Django сервера
10. Запустить сервер Django:

python manage.py runserver

### Запуск React приложения
11. Запустить React приложение:

npm start

## Сборка
npm run build
создает оптимизированную сборку в директории build/


## Лицензия
Этот проект лицензирован под MIT License - подробности см. в файле [LICENSE](LICENSE).
