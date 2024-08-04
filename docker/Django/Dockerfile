### Python builder ###
FROM python:3.10-slim as builder

# Установка рабочей директории
WORKDIR /app/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Копируем requirements для установки зависимостей
COPY ./backend/requirements.txt .

# Устанавливаем зависимости
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/backend/wheels -r requirements.txt

FROM python:3.10-slim

# Установка необходимых пакетов в систему Linux
RUN apt-get update && apt-get install -y --no-install-recommends netcat-openbsd && \
    apt-get autoremove -y && \
    apt-get install -y iproute2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Копируем из билдера установленные зависимости
COPY --from=builder /app/backend/wheels /wheels
COPY --from=builder /app/backend/requirements.txt .

RUN pip install --no-cache /wheels/*

# Установка рабочей директории
WORKDIR /app/backend

# Копируем весь проект в образ
COPY ./backend .

#Копируем entrypoint в образ для запуска
COPY ./docker/Django/entrypoint.sh /app/backend/entrypoint.sh

# Даем права и запускаем entrypoint внутри контейнера
RUN chmod +x /app/backend/entrypoint.sh
ENTRYPOINT ["/app/backend/entrypoint.sh"]