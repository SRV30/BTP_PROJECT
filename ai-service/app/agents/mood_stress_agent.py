from crewai import Agent, LLM

from app.config.settings import Settings
from app.utils.prompts import SYSTEM_BOUNDARY


def create_mood_stress_agent(settings: Settings) -> Agent:
    return Agent(
        role="Mood and Stress Explanation Specialist",
        goal="Explain already-calculated mood and stress values without changing them.",
        backstory=(
            "You specialize in explaining engine-generated mood and stress outputs in clear language. "
            "You never recalculate, override, or dispute those values. "
            f"{SYSTEM_BOUNDARY}"
        ),
        llm=LLM(model=f"groq/{settings.model_name}", api_key=settings.groq_api_key),
        verbose=False,
        allow_delegation=False,
    )
