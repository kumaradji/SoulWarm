# ДушуГрею

## Описание
Веб-приложение, созданное с использованием Django на серверной стороне и React на клиентской стороне. Проект включает в себя функциональность чатов для обычных пользователей и VIP-пользователей, а также мастер-классы и корзину для покупок.

## Установка
1. Клонировать репозиторий
2. Перейти в директорию проекта

### Установка зависимостей для Django

3. Создать виртуальное окружение и активировать его:
```sh
python -m venv venv
source venv/bin/activate  
```
Для Windows используйте `venv\Scripts\activate`


4. Установить зависимости:
```sh
pip install -r requirements.txt
```

5. Применить миграции для настройки базы данных:
```sh
python manage.py makemigrations
python manage.py migrate
```

6. Создать суперпользователя для доступа к административной панели:
```sh
python manage.py createsuperuser
```

### Установка зависимостей для React
7. Перейти в директорию клиента и установить зависимости:
```sh
cd frontend
npm install
```

## Запуск

### Запуск Django сервера
8. Запустить сервер Django:
```sh
python manage.py runserver
```

### Запуск React приложения
9. Запустить React приложение:
```sh
npm run build
npm start
```

### Запуск всех сервисов с помощью Docker Compose

10. Войти в Docker Hub:
```sh
docker login
```

11. Запустить проект с помощью Docker Compose:
```sh
docker-compose up -d
```

12. Остановка всех сервисов Docker Compose:
```sh
docker-compose down
```

## Сборка
```sh
npm run build
```
Создает оптимизированную сборку в директории build/

## Лицензия
Этот проект лицензирован под MIT License - подробности см. в файле [LICENSE](LICENSE).