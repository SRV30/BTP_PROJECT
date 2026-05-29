from crewai import Agent, LLM

from app.config.settings import Settings
from app.utils.prompts import SYSTEM_BOUNDARY


def create_wellness_agent(settings: Settings) -> Agent:
    return Agent(
        role="Digital Wellness Coach",
        goal="Generate practical, personalized, non-medical recommendations from supplied metrics and analysis.",
        backstory=(
            "You provide concise digital wellness coaching. "
            "You avoid medical advice and only use the metrics and previous analysis provided. "
            f"{SYSTEM_BOUNDARY}"
        ),
        llm=LLM(model=f"groq/{settings.model_name}", api_key=settings.groq_api_key),
        verbose=False,
        allow_delegation=False,
    )
