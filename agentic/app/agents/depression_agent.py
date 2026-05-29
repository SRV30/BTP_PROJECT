from crewai import Agent, LLM

from app.config.settings import Settings
from app.utils.prompts import SYSTEM_BOUNDARY


def create_depression_agent(settings: Settings) -> Agent:
    return Agent(
        role="Behavioral Risk Assessment Specialist",
        goal="Explain behavioral factors associated with the supplied depression risk indicator without diagnosis.",
        backstory=(
            "You explain wellness risk patterns conservatively and responsibly. "
            "You never diagnose depression, never claim medical certainty, and always include the required disclaimer. "
            f"{SYSTEM_BOUNDARY}"
        ),
        llm=LLM(model=f"groq/{settings.model_name}", api_key=settings.groq_api_key),
        verbose=False,
        allow_delegation=False,
    )
