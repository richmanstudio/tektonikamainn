from functools import lru_cache
from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Tektonika CMS API"
    app_env: str = "development"
    app_secret_key: str = Field(min_length=32)
    admin_username: str = Field(min_length=3, max_length=80)
    admin_password_hash: str = Field(min_length=40)

    token_ttl_seconds: int = Field(default=60 * 60 * 4, ge=900, le=60 * 60 * 24)
    login_max_attempts: int = Field(default=5, ge=3, le=20)
    login_window_seconds: int = Field(default=15 * 60, ge=60, le=60 * 60)
    login_lock_seconds: int = Field(default=15 * 60, ge=60, le=24 * 60 * 60)

    mysql_host: str = "127.0.0.1"
    mysql_port: int = 3306
    mysql_database: str = "tektonika_cms"
    mysql_user: str = "root"
    mysql_password: str = ""

    cors_origins: str = "http://127.0.0.1:5173,http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip().rstrip("/") for origin in self.cors_origins.split(",") if origin.strip()]

    @model_validator(mode="after")
    def validate_security(self) -> "Settings":
        weak_markers = {"change-me-before-production", "secret", "password", "admin123"}
        if self.app_secret_key.lower() in weak_markers:
            raise ValueError("APP_SECRET_KEY must be a unique cryptographically-random value")
        if not self.admin_password_hash.startswith("pbkdf2_sha256$"):
            raise ValueError("ADMIN_PASSWORD_HASH must use the pbkdf2_sha256 format")
        if self.app_env.lower() == "production":
            if any(origin.startswith("http://") for origin in self.cors_origin_list):
                raise ValueError("Production CORS origins must use HTTPS")
            if not self.mysql_password:
                raise ValueError("MYSQL_PASSWORD is required in production")
        return self


@lru_cache
def get_settings() -> Settings:
    return Settings()
