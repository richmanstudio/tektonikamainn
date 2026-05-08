from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .init_db import init_database
from .repository import create_entry, delete_entry, get_public_collection, list_entries, update_entry
from .schemas import CmsEntryCreate, CmsEntryUpdate, LoginRequest, TokenResponse
from .security import authenticate, create_token, require_admin

settings = get_settings()
app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}


@app.post("/api/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    if not authenticate(payload.username, payload.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
    return TokenResponse(token=create_token(payload.username))


@app.post("/api/admin/init-db", dependencies=[Depends(require_admin)])
def init_db_endpoint() -> dict[str, bool]:
    init_database()
    return {"success": True}


@app.get("/api/public/{collection}")
def public_collection(collection: str, lang: str = Query("ru", min_length=2, max_length=8)) -> list[dict]:
    return get_public_collection(collection=collection, language=lang)


@app.get("/api/public/site")
def public_site(lang: str = Query("ru", min_length=2, max_length=8)) -> dict[str, list[dict]]:
    collections = ["projects", "research", "vacancies", "services", "pages", "media"]
    return {collection: get_public_collection(collection=collection, language=lang) for collection in collections}


@app.get("/api/cms/entries", dependencies=[Depends(require_admin)])
def cms_entries(collection: str | None = None, language: str | None = None) -> list[dict]:
    return list_entries(collection=collection, language=language, include_drafts=True)


@app.post("/api/cms/entries", dependencies=[Depends(require_admin)])
def cms_create_entry(entry: CmsEntryCreate) -> dict:
    return create_entry(entry)


@app.put("/api/cms/entries/{entry_id}", dependencies=[Depends(require_admin)])
def cms_update_entry(entry_id: int, entry: CmsEntryUpdate) -> dict:
    return update_entry(entry_id, entry)


@app.delete("/api/cms/entries/{entry_id}", dependencies=[Depends(require_admin)])
def cms_delete_entry(entry_id: int) -> dict[str, bool]:
    delete_entry(entry_id)
    return {"success": True}
