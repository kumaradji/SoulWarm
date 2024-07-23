FROM --platform=linux/amd64 node:18-alpine as build

# Устанавливаем зависимости
WORKDIR /app
COPY ../../frontend/package.json /app/
COPY ../../frontend/package-lock.json /app/
RUN npm install

# Копируем проект и собираем его
COPY ../../frontend /app/
RUN npm run build

# Запускаем Nginx для сервировки React приложения
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ../../frontend/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
