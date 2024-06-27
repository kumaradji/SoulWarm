.PHONY: backend frontend all stop

start:
	@echo "Starting server and Celery worker..."
	(cd /Users/kumar_air/FullstackProjects/SoulWarm/backend && \
	source /Users/kumar_air/FullstackProjects/SoulWarm/backend/venv/bin/activate && \
	python manage.py runserver 8000 & echo $$! > backend_server.pid)
	(cd /Users/kumar_air/FullstackProjects/SoulWarm/backend && \
	source /Users/kumar_air/FullstackProjects/SoulWarm/backend/venv/bin/activate && \
	celery -A soulwarm worker -l info & echo $$! > celery_worker.pid)

stop:
	@echo "Stopping all running processes..."
	@if [ -f /Users/kumar_air/FullstackProjects/SoulWarm/backend/backend_server.pid ]; then \
		kill `cat /Users/kumar_air/FullstackProjects/SoulWarm/backend/backend_server.pid`; \
		rm /Users/kumar_air/FullstackProjects/SoulWarm/backend/backend_server.pid; \
	else \
		echo "backend_server.pid not found"; \
	fi
	@if [ -f /Users/kumar_air/FullstackProjects/SoulWarm/backend/celery_worker.pid ]; then \
		kill `cat /Users/kumar_air/FullstackProjects/SoulWarm/backend/celery_worker.pid`; \
		rm /Users/kumar_air/FullstackProjects/SoulWarm/backend/celery_worker.pid; \
	else \
		echo "celery_worker.pid not found"; \
	fi
