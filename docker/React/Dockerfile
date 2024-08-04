### Node.js ###
FROM node:18-alpine as builder

# Установка рабочей директории
WORKDIR /app/frontend

# Копируем package для установки зависимостей
COPY ./frontend/package.json .

RUN npm install

# Копируем весь проект
COPY ./frontend .

# Собираем билд
RUN npm run build

FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app/frontend

# Запуск сервера React
RUN npm install -g serve

# Копируем из билда статическую сборку
COPY --from=builder /app/frontend/build ./build