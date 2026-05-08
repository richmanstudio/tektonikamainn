from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Tektonika CMS API"
    app_env: str = "development"
    app_secret_key: str = "change-me-before-production"
    admin_username: str = "tektonikadmin"
    admin_password: str = "admin123"

    mysql_host: str = "127.0.0.1"
    mysql_port: int = 3306
    mysql_database: str = "tektonika_cms"
    mysql_user: str = "root"
    mysql_password: str = ""

    cors_origins: str = "http://127.0.0.1:5173,http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
