from typing import Any, Literal
from pydantic import BaseModel, Field


EntryStatus = Literal["draft", "published"]
CmsCollection = Literal["projects", "research", "vacancies", "services", "pages", "media"]
CmsLanguage = Literal["ru", "en", "zh"]


class LoginRequest(BaseModel):
    username: str = Field(min_length=3, max_length=80)
    password: str = Field(min_length=8, max_length=256)


class TokenResponse(BaseModel):
    token: str
    token_type: str = "bearer"
    expires_in: int


class CmsEntryCreate(BaseModel):
    collection: CmsCollection
    slug: str = Field(min_length=1, max_length=120, pattern=r"^[a-z0-9][a-z0-9-]*$")
    language: CmsLanguage = "ru"
    title: str = Field(min_length=1, max_length=255)
    payload: dict[str, Any]
    status: EntryStatus = "published"
    sort_order: int = Field(default=100, ge=0, le=100_000)


class CmsEntryUpdate(BaseModel):
    collection: CmsCollection | None = None
    slug: str | None = Field(default=None, min_length=1, max_length=120, pattern=r"^[a-z0-9][a-z0-9-]*$")
    language: CmsLanguage | None = None
    title: str | None = Field(default=None, min_length=1, max_length=255)
    payload: dict[str, Any] | None = None
    status: EntryStatus | None = None
    sort_order: int | None = Field(default=None, ge=0, le=100_000)
