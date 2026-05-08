from collections.abc import Iterator
from contextlib import contextmanager
import pymysql
from pymysql.cursors import DictCursor
from .config import get_settings


@contextmanager
def get_connection() -> Iterator[pymysql.Connection]:
    settings = get_settings()
    connection = pymysql.connect(
        host=settings.mysql_host,
        port=settings.mysql_port,
        user=settings.mysql_user,
        password=settings.mysql_password,
        database=settings.mysql_database,
        charset="utf8mb4",
        cursorclass=DictCursor,
        autocommit=False,
    )
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()
