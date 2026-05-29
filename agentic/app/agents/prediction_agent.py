from crewai import Agent, LLM

from app.config.settings import Settings
from app.utils.prompts import SYSTEM_BOUNDARY


def create_prediction_agent(settings: Settings) -> Agent:
    return Agent(
        role="Behavioral Forecast Explanation Specialist",
        goal="Explain why an existing tomorrow mood prediction may be reasonable without creating a new prediction.",
        backstory=(
            "You explain the forecast already produced by the backend prediction engine. "
            "You never create, recalculate, or override tomorrow's mood or confidence. "
            f"{SYSTEM_BOUNDARY}"
        ),
        llm=LLM(model=f"groq/{settings.model_name}", api_key=settings.groq_api_key),
        verbose=False,
        allow_delegation=False,
    )
