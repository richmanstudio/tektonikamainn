# Tektonika CMS Backend

FastAPI + MySQL backend for the website CMS.

## Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Fill `.env` with real MySQL credentials. Do not commit `.env`.

## Run

```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## Initialize Database

```powershell
python -m app.init_db
python -m app.seed
```

## Main Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/public/site?lang=ru`
- `GET /api/public/{collection}?lang=ru`
- `GET /api/cms/entries`
- `POST /api/cms/entries`
- `PUT /api/cms/entries/{id}`
- `DELETE /api/cms/entries/{id}`

CMS endpoints require `Authorization: Bearer <token>`.
