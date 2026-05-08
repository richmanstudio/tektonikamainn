from .db import get_connection


SCHEMA = """
CREATE TABLE IF NOT EXISTS cms_entries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  collection VARCHAR(80) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  language VARCHAR(8) NOT NULL DEFAULT 'ru',
  title VARCHAR(255) NOT NULL,
  payload JSON NOT NULL,
  status ENUM('draft','published') NOT NULL DEFAULT 'published',
  sort_order INT NOT NULL DEFAULT 100,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cms_entry (collection, slug, language),
  INDEX idx_public_lookup (collection, language, status, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
"""


def init_database() -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(SCHEMA)


if __name__ == "__main__":
    init_database()
    print("Database schema is ready.")
