import logging
import sys
from typing import Any

from pythonjsonlogger import jsonlogger

from app.config.settings import get_settings


def configure_logging() -> None:
    """Configure structured JSON logging for the AI service."""

    settings = get_settings()
    root_logger = logging.getLogger()
    root_logger.handlers.clear()
    root_logger.setLevel(settings.log_level.upper())

    handler = logging.StreamHandler(sys.stdout)
    formatter = jsonlogger.JsonFormatter(
        "%(asctime)s %(levelname)s %(name)s %(message)s %(event)s %(userId)s %(currentDate)s",
    )
    handler.setFormatter(formatter)
    root_logger.addHandler(handler)


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)


def log_event(logger: logging.Logger, level: int, message: str, **extra: Any) -> None:
    logger.log(level, message, extra=extra)
