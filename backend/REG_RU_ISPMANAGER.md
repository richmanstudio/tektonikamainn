# Запуск backend на reg.ru / ISPmanager

В shell ISPmanager команда `pip` может отсутствовать как отдельная команда. Это нормально. Используйте `python3 -m pip` или создайте виртуальное окружение.

Важно: `npm install pip` делать не нужно. `pip` не является npm-пакетом.

## 1. Проверить Python

```bash
python3 --version
python3 -m pip --version
```

Если `python3 -m pip --version` пишет, что pip не установлен, попробуйте:

```bash
python3 -m ensurepip --user
python3 -m pip install --user --upgrade pip
```

Если `ensurepip` отключен на хостинге, установите зависимости через виртуальное окружение в ISPmanager или обратитесь в поддержку reg.ru с просьбой включить `pip` для Python.

## 2. Создать виртуальное окружение

Из папки backend:

```bash
cd /var/www/u3171937/data/backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

После активации окружения команда `python -m pip` должна работать даже если просто `pip` недоступен.

## 3. Настроить `.env`

Создайте файл `.env` в папке `backend`:

```bash
nano .env
```

Пример:

```env
APP_NAME=Tektonika CMS API
APP_ENV=production
APP_SECRET_KEY=replace_with_long_random_string
ADMIN_USERNAME=tektonikadmin
ADMIN_PASSWORD=admin123

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=u3171937_default
MYSQL_USER=u3171937_default
MYSQL_PASSWORD=your_mysql_password

CORS_ORIGINS=https://your-domain.ru,http://your-domain.ru
```

Для MySQL в ISPmanager часто используется `MYSQL_HOST=localhost`. Имя базы может отличаться от имени пользователя: проверьте его в разделе баз данных ISPmanager.

## 4. Инициализировать таблицы и seed

```bash
source .venv/bin/activate
python -m app.init_db
python -m app.seed
```

Если видите `Access denied for user`, значит MySQL не принимает `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` или у пользователя нет прав на выбранную базу.

## 5. Запуск API

Для проверки:

```bash
source .venv/bin/activate
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Проверка:

```bash
curl http://127.0.0.1:8000/api/health
```

Для постоянной работы API на хостинге настройте Python-приложение/Passenger, supervisor или systemd, если это доступно в тарифе. Точка входа приложения:

```text
backend.app.main:app
```

## 6. Подключить frontend

В frontend-сборке переменная должна указывать на публичный API:

```env
VITE_API_URL=https://your-domain.ru/api
```

Если API будет жить на поддомене, например `api.your-domain.ru`, используйте:

```env
VITE_API_URL=https://api.your-domain.ru/api
```
