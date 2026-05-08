# Backend API для CMS

## Настройка

В файле `.env` или `.env.local` укажите URL вашего API:

```env
VITE_API_URL=http://localhost:3000/api
```

## Требуемые Endpoints

### Projects (Проекты)

- `GET /api/cms/projects` - Получить все проекты
- `POST /api/cms/projects` - Сохранить все проекты (массив)
- `POST /api/cms/projects/add` - Добавить новый проект
- `PUT /api/cms/projects/:id` - Обновить проект
- `DELETE /api/cms/projects/:id` - Удалить проект

### Media (Медиа)

- `GET /api/cms/media` - Получить все медиа элементы
- `POST /api/cms/media` - Сохранить все медиа элементы (массив)
- `POST /api/cms/media/add` - Добавить новый медиа элемент
- `PUT /api/cms/media/:id` - Обновить медиа элемент
- `DELETE /api/cms/media/:id` - Удалить медиа элемент

### Research (Научная деятельность)

- `GET /api/cms/research` - Получить все публикации
- `POST /api/cms/research` - Сохранить все публикации (массив)
- `POST /api/cms/research/add` - Добавить новую публикацию
- `PUT /api/cms/research/:id` - Обновить публикацию
- `DELETE /api/cms/research/:id` - Удалить публикацию

### About (О нас)

- `GET /api/cms/about` - Получить контент страницы "О нас"
- `POST /api/cms/about` - Сохранить контент страницы "О нас"

### Careers (Карьера)

- `GET /api/cms/careers` - Получить все вакансии
- `POST /api/cms/careers` - Сохранить все вакансии (массив)
- `POST /api/cms/careers/add` - Добавить новую вакансию
- `PUT /api/cms/careers/:id` - Обновить вакансию
- `DELETE /api/cms/careers/:id` - Удалить вакансию

## Пример ответа

### GET /api/cms/projects
```json
[
  {
    "id": "1",
    "title": "Название проекта",
    "region": "Хабаровский край",
    "year": 2024,
    "short": "Краткое описание",
    "desc": "Полное описание проекта",
    "image": "https://example.com/image.jpg"
  }
]
```

### GET /api/cms/about
```json
{
  "heroTitle": "О компании",
  "heroDescription": "Описание компании",
  "stats": [
    {
      "id": 1,
      "label": "Год основания",
      "value": "2023"
    }
  ],
  "timeline": [
    {
      "year": "2023",
      "title": "Основание",
      "desc": "Описание события"
    }
  ],
  "values": [
    {
      "icon": "❤️",
      "title": "Ценность",
      "desc": "Описание ценности"
    }
  ]
}
```

## Пример реализации на Node.js/Express

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Простое хранилище в памяти (для продакшена используйте БД)
const storage = {
  projects: [],
  media: [],
  research: [],
  about: null,
  careers: [],
};

// Projects
app.get('/api/cms/projects', (req, res) => {
  res.json(storage.projects);
});

app.post('/api/cms/projects', (req, res) => {
  storage.projects = req.body;
  res.json({ success: true });
});

app.post('/api/cms/projects/add', (req, res) => {
  storage.projects.push(req.body);
  res.json({ success: true });
});

app.put('/api/cms/projects/:id', (req, res) => {
  const index = storage.projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    storage.projects[index] = { ...storage.projects[index], ...req.body };
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/cms/projects/:id', (req, res) => {
  storage.projects = storage.projects.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

// Аналогично для других endpoints...

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});
```

## Безопасность

⚠️ **Важно:** Добавьте авторизацию на все CMS endpoints!

```javascript
// Middleware для проверки авторизации
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  // Проверка токена
  if (!token || !isValidToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Использование
app.get('/api/cms/projects', requireAuth, (req, res) => {
  // ...
});
```

