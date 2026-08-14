from fastapi import Depends, FastAPI, HTTPException, Query, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .init_db import init_database
from .repository import create_entry, delete_entry, get_public_collection, list_entries, update_entry
from .schemas import CmsEntryCreate, CmsEntryUpdate, LoginRequest, TokenResponse
from .security import authenticate, create_token, login_limiter, require_admin

settings = get_settings()
app = FastAPI(title=settings.app_name, docs_url="/api/docs" if settings.app_env != "production" else None, redoc_url=None)

PUBLIC_COLLECTIONS = ("projects", "research", "vacancies", "services", "pages", "media")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    if request.url.path.startswith("/api/auth") or request.url.path.startswith("/api/cms") or request.url.path.startswith("/api/admin"):
        response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}


@app.post("/api/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, request: Request, response: Response) -> TokenResponse:
    client_ip = request.client.host if request.client else "unknown"
    limiter_key = f"{client_ip}:{payload.username.casefold()}"
    decision = login_limiter.check(limiter_key)
    if not decision.allowed:
        response.headers["Retry-After"] = str(decision.retry_after)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many login attempts. Try again later.",
            headers={"Retry-After": str(decision.retry_after)},
        )

    if not authenticate(payload.username, payload.password):
        login_limiter.record_failure(limiter_key)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

    login_limiter.reset(limiter_key)
    return TokenResponse(token=create_token(payload.username), expires_in=settings.token_ttl_seconds)


@app.post("/api/admin/init-db", dependencies=[Depends(require_admin)])
def init_db_endpoint() -> dict[str, bool]:
    init_database()
    return {"success": True}


@app.get("/api/public/{collection}")
def public_collection(collection: str, lang: str = Query("ru", pattern="^(ru|en|zh)$")) -> list[dict]:
    if collection not in PUBLIC_COLLECTIONS:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unknown collection")
    return get_public_collection(collection=collection, language=lang)


@app.get("/api/public/site")
def public_site(lang: str = Query("ru", pattern="^(ru|en|zh)$")) -> dict[str, list[dict]]:
    return {collection: get_public_collection(collection=collection, language=lang) for collection in PUBLIC_COLLECTIONS}


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
