import logging

from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.schemas.request import AnalysisRequest
from app.schemas.response import AnalysisResponse
from app.services.analysis_service import AnalysisService, CrewAIExecutionError, get_analysis_service
from app.utils.logger import configure_logging, get_logger, log_event

configure_logging()
logger = get_logger(__name__)

app = FastAPI(
    title="MoodSense AI Service",
    description="CrewAI + Groq analysis layer for MoodSense AI. Explains backend-generated wellness results only.",
    version="1.0.0",
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request: Request, exc: RequestValidationError) -> JSONResponse:
    log_event(
        logger,
        logging.WARNING,
        "Invalid payload",
        event="validation_error",
        userId="",
        currentDate="",
        errors=exc.errors(),
    )
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"success": False, "message": "Invalid payload", "errors": exc.errors()},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(_request: Request, exc: HTTPException) -> JSONResponse:
    detail = exc.detail if isinstance(exc.detail, dict) else {"success": False, "message": str(exc.detail)}
    log_event(
        logger,
        logging.WARNING if exc.status_code < 500 else logging.ERROR,
        "HTTP exception",
        event="http_error",
        userId="",
        currentDate="",
        statusCode=exc.status_code,
        detail=detail,
    )
    return JSONResponse(status_code=exc.status_code, content=detail)


@app.exception_handler(Exception)
async def internal_exception_handler(_request: Request, exc: Exception) -> JSONResponse:
    log_event(
        logger,
        logging.ERROR,
        "Internal exception",
        event="internal_error",
        userId="",
        currentDate="",
        error=str(exc),
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"success": False, "message": "Internal server error"},
    )


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "MoodSense AI Service Running"}


@app.post("/analyze", response_model=AnalysisResponse)
def analyze(
    payload: AnalysisRequest,
    analysis_service: AnalysisService = Depends(get_analysis_service),
) -> AnalysisResponse:
    try:
        return analysis_service.analyze(payload)
    except CrewAIExecutionError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"success": False, "message": str(error)},
        ) from error
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"success": False, "message": str(error)},
        ) from error
