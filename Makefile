# Определение переменных
BACKEND_DIR = /Users/kumar_air/FullstackProjects/SoulWarm/backend
FRONTEND_DIR = /Users/kumar_air/FullstackProjects/SoulWarm/frontend
VENV = source venv/bin/activate

# Запуск Django сервера
run-django:
	cd $(BACKEND_DIR) && $(VENV) && python manage.py runserver 8000

# Запуск Celery
run-celery:
	cd $(BACKEND_DIR) && $(VENV) && celery -A soulwarm worker -l info

# Запуск фронтенда
run-frontend:
	cd $(FRONTEND_DIR) && PORT=3000 npm start

# Остановка всех процессов
stop-all:
	@echo "Останавливаем все процессы..."
	-pkill -f "python manage.py runserver" || true
	-pkill -f "celery -A soulwarm worker" || true
	-pkill -f "react-scripts/scripts/start.js" || true
	@echo "Все процессы остановлены или не были запущены."

# Запуск всех компонентов
run-all: stop-all
	@echo "Запускаем все компоненты..."
	make -j3 run-django run-celery run-frontend

# Помощь
help:
	@echo "Доступные команды:"
	@echo "  make run-django    - Запуск Django сервера"
	@echo "  make run-celery    - Запуск Celery"
	@echo "  make run-frontend  - Запуск фронтенда"
	@echo "  make run-all       - Запуск всех компонентов"
	@echo "  make stop-all      - Остановка всех процессов"
	@echo "  make help          - Показать эту справку"

.PHONY: run-django run-celery run-frontend run-all stop-all help