from datetime import date
from enum import Enum

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class TimeSlot(str, Enum):
    MORNING = "MORNING"
    AFTERNOON = "AFTERNOON"
    EVENING = "EVENING"
    NIGHT = "NIGHT"


class MoodLabel(str, Enum):
    Happy = "Happy"
    Neutral = "Neutral"
    Sad = "Sad"


class StressLevel(str, Enum):
    Low = "Low"
    Moderate = "Moderate"
    High = "High"


class DepressionRisk(str, Enum):
    LowRisk = "Low Risk"
    ModerateRisk = "Moderate Risk"
    HighRisk = "High Risk"


class WeeklyTrend(str, Enum):
    Improving = "Improving"
    Stable = "Stable"
    Declining = "Declining"


class AnalysisRequest(BaseModel):
    """Validated payload from Node.js backend into the AI analysis layer."""

    userId: str = Field(min_length=1, max_length=128)
    userName: str = Field(min_length=1, max_length=120)
    currentDate: date
    currentTimeSlot: TimeSlot
    averageSleep: float = Field(ge=0, le=24)
    averageSteps: int = Field(ge=0, le=100000)
    averageScreenTime: float = Field(ge=0, le=24)
    instagramUsage: int = Field(ge=0, le=1440)
    whatsappUsage: int = Field(ge=0, le=1440)
    linkedinUsage: int = Field(ge=0, le=1440)
    gmailUsage: int = Field(ge=0, le=1440)
    udemyUsage: int = Field(ge=0, le=1440)
    moodScore: int = Field(ge=0, le=100)
    moodLabel: MoodLabel
    stressScore: int = Field(ge=0, le=100)
    stressLevel: StressLevel
    depressionRisk: DepressionRisk
    tomorrowMood: MoodLabel
    tomorrowConfidence: int = Field(ge=0, le=100)
    weeklyTrend: WeeklyTrend
    happyDays: int = Field(ge=0, le=7)
    neutralDays: int = Field(ge=0, le=7)
    sadDays: int = Field(ge=0, le=7)
    weeklyMoodScores: list[int] = Field(min_length=7, max_length=7)
    sleepPattern: str = Field(min_length=1, max_length=50)
    activityPattern: str = Field(min_length=1, max_length=50)
    screenTimePattern: str = Field(min_length=1, max_length=50)

    model_config = ConfigDict(extra="forbid", use_enum_values=True)

    @field_validator("weeklyMoodScores")
    @classmethod
    def validate_weekly_scores(cls, values: list[int]) -> list[int]:
        for score in values:
            if score < 0 or score > 100:
                raise ValueError("Each weekly mood score must be between 0 and 100")
        return values

    @model_validator(mode="after")
    def validate_day_distribution(self) -> "AnalysisRequest":
        total_days = self.happyDays + self.neutralDays + self.sadDays
        if total_days != 7:
            raise ValueError("happyDays + neutralDays + sadDays must equal 7")
        return self
