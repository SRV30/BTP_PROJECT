from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class Recommendation(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    description: str = Field(min_length=1, max_length=500)

    model_config = ConfigDict(extra="forbid")


class AnalysisData(BaseModel):
    behaviorSummary: str
    moodAnalysis: str
    stressAnalysis: str
    depressionAnalysis: str
    predictionAnalysis: str
    recommendations: list[Recommendation]
    model: str
    generatedAt: datetime
    cached: bool = False

    model_config = ConfigDict(extra="forbid")


class AnalysisResponse(BaseModel):
    success: bool = True
    data: AnalysisData

    model_config = ConfigDict(extra="forbid")
