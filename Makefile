# Определение переменных
BACKEND_DIR=/Users/kumar_air/FullstackProjects/SoulWarm/backend
FRONTEND_DIR=/Users/kumar_air/FullstackProjects/SoulWarm/frontend
VENV=source $(BACKEND_DIR)/venv/bin/activate &&

# Запуск Django сервера
run-django:
	cd $(BACKEND_DIR) && $(VENV) python manage.py runserver 8000

# Запуск фронтенда
run-frontend:
	cd $(FRONTEND_DIR) && PORT=3000 npm start

# Остановка Django сервера
stop-django:
	@echo "Останавливаем Django сервер..."
	-pkill -f "python manage.py runserver" || true

# Остановка фронтенда
stop-frontend:
	@echo "Останавливаем фронтенд..."
	-pkill -f "react-scripts/scripts/start.js" || true

# Запуск всех компонентов
run-all: stop-django stop-frontend
	@echo "Запускаем все компоненты..."
	make -j2 run-django run-frontend

# Остановка всех процессов
stop-all: stop-django stop-frontend
	@echo "Все процессы остановлены или не были запущены."

# Помощь
help:
	@echo "Доступные команды:"
	@echo "  make run-django       - Запуск Django сервера"
	@echo "  make run-frontend     - Запуск фронтенда"
	@echo "  make run-all          - Запуск всех компонентов"
	@echo "  make stop-django      - Остановка Django сервера"
	@echo "  make stop-frontend    - Остановка фронтенда"
	@echo "  make stop-all         - Остановка всех процессов"
	@echo "  make help             - Показать эту справку"

.PHONY: run-django run-frontend run-all stop-django stop-frontend stop-all help
