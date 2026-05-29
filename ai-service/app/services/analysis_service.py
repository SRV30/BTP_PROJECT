import logging
from datetime import datetime, timezone

from app.config.settings import Settings, get_settings
from app.crews.moodsense_crew import CrewAIExecutionError, MoodSenseCrew
from app.schemas.request import AnalysisRequest
from app.schemas.response import AnalysisData, AnalysisResponse
from app.services.cache_service import CacheService, cache_service
from app.utils.logger import get_logger, log_event

logger = get_logger(__name__)


class AnalysisService:
    """Service layer for request validation, caching, CrewAI execution, and response shaping."""

    def __init__(self, settings: Settings, cache: CacheService) -> None:
        self.settings = settings
        self.cache = cache

    def analyze(self, request: AnalysisRequest) -> AnalysisResponse:
        current_date = request.currentDate.isoformat()
        log_event(
            logger,
            logging.INFO,
            "Incoming Request",
            event="incoming_request",
            userId=request.userId,
            currentDate=current_date,
        )

        cached = self.cache.get_cached_analysis(request.userId, current_date)
        if cached is not None:
            log_event(
                logger,
                logging.INFO,
                "Cache Hit",
                event="cache_hit",
                userId=request.userId,
                currentDate=current_date,
            )
            return AnalysisResponse(data=cached)

        log_event(
            logger,
            logging.INFO,
            "Cache Miss",
            event="cache_miss",
            userId=request.userId,
            currentDate=current_date,
        )

        crew_result = MoodSenseCrew(self.settings).run(request)
        data = AnalysisData(
            behaviorSummary=crew_result["behaviorSummary"],
            moodAnalysis=crew_result["moodAnalysis"],
            stressAnalysis=crew_result["stressAnalysis"],
            depressionAnalysis=crew_result["depressionAnalysis"],
            predictionAnalysis=crew_result["predictionAnalysis"],
            recommendations=crew_result["recommendations"],
            model=self.settings.model_name,
            generatedAt=datetime.now(timezone.utc),
            cached=False,
        )
        self.cache.save_cache(request.userId, current_date, data)
        return AnalysisResponse(data=data)


def get_analysis_service() -> AnalysisService:
    return AnalysisService(settings=get_settings(), cache=cache_service)


__all__ = ["AnalysisService", "CrewAIExecutionError", "get_analysis_service"]
