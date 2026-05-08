from typing import Any, Literal
from pydantic import BaseModel, Field


EntryStatus = Literal["draft", "published"]


class LoginRequest(BaseModel):
    username: str = Field(min_length=1)
    password: str = Field(min_length=1)


class TokenResponse(BaseModel):
    token: str
    token_type: str = "bearer"


class CmsEntryCreate(BaseModel):
    collection: str = Field(min_length=1, max_length=80)
    slug: str = Field(min_length=1, max_length=120)
    language: str = Field(default="ru", min_length=2, max_length=8)
    title: str = Field(min_length=1, max_length=255)
    payload: dict[str, Any]
    status: EntryStatus = "published"
    sort_order: int = 100


class CmsEntryUpdate(BaseModel):
    collection: str | None = Field(default=None, min_length=1, max_length=80)
    slug: str | None = Field(default=None, min_length=1, max_length=120)
    language: str | None = Field(default=None, min_length=2, max_length=8)
    title: str | None = Field(default=None, min_length=1, max_length=255)
    payload: dict[str, Any] | None = None
    status: EntryStatus | None = None
    sort_order: int | None = None
