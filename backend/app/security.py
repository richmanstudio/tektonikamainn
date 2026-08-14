import base64
import hashlib
import hmac
import json
import secrets
import threading
import time
from collections import defaultdict, deque
from dataclasses import dataclass
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from .config import get_settings

bearer_scheme = HTTPBearer(auto_error=False)
PBKDF2_ITERATIONS = 310_000


def _b64encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode("ascii").rstrip("=")


def _b64decode(data: str) -> bytes:
    padding = "=" * (-len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)


def hash_password(password: str, *, iterations: int = PBKDF2_ITERATIONS) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return f"pbkdf2_sha256${iterations}${_b64encode(salt)}${_b64encode(digest)}"


def verify_password(password: str, encoded: str) -> bool:
    try:
        algorithm, iterations_raw, salt_raw, expected_raw = encoded.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        iterations = int(iterations_raw)
        salt = _b64decode(salt_raw)
        expected = _b64decode(expected_raw)
        actual = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False


def create_token(username: str) -> str:
    settings = get_settings()
    now = int(time.time())
    payload = {
        "sub": username,
        "iat": now,
        "exp": now + settings.token_ttl_seconds,
        "jti": secrets.token_urlsafe(12),
    }
    body = _b64encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    signature = hmac.new(settings.app_secret_key.encode("utf-8"), body.encode("ascii"), hashlib.sha256).digest()
    return f"{body}.{_b64encode(signature)}"


def verify_token(token: str) -> dict:
    settings = get_settings()
    try:
        body, signature = token.split(".", 1)
        expected = hmac.new(settings.app_secret_key.encode("utf-8"), body.encode("ascii"), hashlib.sha256).digest()
        if not hmac.compare_digest(_b64decode(signature), expected):
            raise ValueError("bad signature")
        payload = json.loads(_b64decode(body))
        if int(payload.get("exp", 0)) <= int(time.time()):
            raise ValueError("expired")
        if payload.get("sub") != settings.admin_username:
            raise ValueError("invalid subject")
        return payload
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token") from exc


def authenticate(username: str, password: str) -> bool:
    settings = get_settings()
    username_ok = secrets.compare_digest(username, settings.admin_username)
    password_ok = verify_password(password, settings.admin_password_hash)
    return username_ok and password_ok


@dataclass
class LoginDecision:
    allowed: bool
    retry_after: int = 0


class LoginAttemptLimiter:
    """Small in-process brute-force guard suitable for the current single-instance CMS."""

    def __init__(self) -> None:
        self._attempts: dict[str, deque[float]] = defaultdict(deque)
        self._locked_until: dict[str, float] = {}
        self._lock = threading.Lock()

    def check(self, key: str) -> LoginDecision:
        settings = get_settings()
        now = time.monotonic()
        with self._lock:
            locked_until = self._locked_until.get(key, 0)
            if locked_until > now:
                return LoginDecision(False, max(1, int(locked_until - now)))

            attempts = self._attempts[key]
            threshold = now - settings.login_window_seconds
            while attempts and attempts[0] < threshold:
                attempts.popleft()
            return LoginDecision(len(attempts) < settings.login_max_attempts)

    def record_failure(self, key: str) -> None:
        settings = get_settings()
        now = time.monotonic()
        with self._lock:
            attempts = self._attempts[key]
            attempts.append(now)
            threshold = now - settings.login_window_seconds
            while attempts and attempts[0] < threshold:
                attempts.popleft()
            if len(attempts) >= settings.login_max_attempts:
                self._locked_until[key] = now + settings.login_lock_seconds
                attempts.clear()

    def reset(self, key: str) -> None:
        with self._lock:
            self._attempts.pop(key, None)
            self._locked_until.pop(key, None)


login_limiter = LoginAttemptLimiter()


def require_admin(credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme)) -> dict:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    return verify_token(credentials.credentials)
