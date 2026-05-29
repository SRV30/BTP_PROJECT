from copy import deepcopy
from threading import Lock

from app.schemas.response import AnalysisData


class CacheService:
    """Simple in-memory cache keyed by userId and currentDate."""

    def __init__(self) -> None:
        self._cache: dict[str, AnalysisData] = {}
        self._lock = Lock()

    @staticmethod
    def _key(user_id: str, current_date: str) -> str:
        return f"{user_id}:{current_date}"

    def check_cache(self, user_id: str, current_date: str) -> bool:
        with self._lock:
            return self._key(user_id, current_date) in self._cache

    def get_cached_analysis(self, user_id: str, current_date: str) -> AnalysisData | None:
        with self._lock:
            cached = self._cache.get(self._key(user_id, current_date))
            if cached is None:
                return None
            cached_copy = deepcopy(cached)
            cached_copy.cached = True
            return cached_copy

    def save_cache(self, user_id: str, current_date: str, analysis: AnalysisData) -> None:
        with self._lock:
            self._cache[self._key(user_id, current_date)] = deepcopy(analysis)


cache_service = CacheService()
