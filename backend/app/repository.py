import json
from typing import Any
from fastapi import HTTPException, status
from .db import get_connection
from .schemas import CmsEntryCreate, CmsEntryUpdate


def _serialize(row: dict[str, Any]) -> dict[str, Any]:
    payload = row.get("payload")
    if isinstance(payload, str):
        row["payload"] = json.loads(payload)
    return row


def list_entries(collection: str | None = None, language: str | None = None, include_drafts: bool = True) -> list[dict[str, Any]]:
    clauses: list[str] = []
    params: list[Any] = []
    if collection:
        clauses.append("collection = %s")
        params.append(collection)
    if language:
        clauses.append("language = %s")
        params.append(language)
    if not include_drafts:
        clauses.append("status = 'published'")
    where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
    sql = f"""
        SELECT id, collection, slug, language, title, payload, status, sort_order, created_at, updated_at
        FROM cms_entries
        {where}
        ORDER BY collection ASC, sort_order ASC, id ASC
    """
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(sql, params)
            return [_serialize(row) for row in cursor.fetchall()]


def get_public_collection(collection: str, language: str) -> list[dict[str, Any]]:
    rows = list_entries(collection=collection, language=language, include_drafts=False)
    if rows:
        return rows
    return list_entries(collection=collection, language="ru", include_drafts=False)


def create_entry(entry: CmsEntryCreate) -> dict[str, Any]:
    sql = """
        INSERT INTO cms_entries (collection, slug, language, title, payload, status, sort_order)
        VALUES (%s, %s, %s, %s, CAST(%s AS JSON), %s, %s)
        ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          payload = VALUES(payload),
          status = VALUES(status),
          sort_order = VALUES(sort_order)
    """
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                sql,
                (
                    entry.collection,
                    entry.slug,
                    entry.language,
                    entry.title,
                    json.dumps(entry.payload, ensure_ascii=False),
                    entry.status,
                    entry.sort_order,
                ),
            )
            entry_id = cursor.lastrowid
            if entry_id == 0:
                cursor.execute(
                    "SELECT id FROM cms_entries WHERE collection=%s AND slug=%s AND language=%s",
                    (entry.collection, entry.slug, entry.language),
                )
                entry_id = cursor.fetchone()["id"]
            cursor.execute("SELECT * FROM cms_entries WHERE id=%s", (entry_id,))
            return _serialize(cursor.fetchone())


def update_entry(entry_id: int, patch: CmsEntryUpdate) -> dict[str, Any]:
    data = patch.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nothing to update")
    assignments: list[str] = []
    params: list[Any] = []
    for key, value in data.items():
        if key == "payload":
            assignments.append("payload = CAST(%s AS JSON)")
            params.append(json.dumps(value, ensure_ascii=False))
        else:
            assignments.append(f"{key} = %s")
            params.append(value)
    params.append(entry_id)
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(f"UPDATE cms_entries SET {', '.join(assignments)} WHERE id=%s", params)
            if cursor.rowcount == 0:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entry not found")
            cursor.execute("SELECT * FROM cms_entries WHERE id=%s", (entry_id,))
            return _serialize(cursor.fetchone())


def delete_entry(entry_id: int) -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM cms_entries WHERE id=%s", (entry_id,))
            if cursor.rowcount == 0:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entry not found")
