from crewai import Agent, LLM

from app.config.settings import Settings
from app.utils.prompts import SYSTEM_BOUNDARY


def create_behavior_agent(settings: Settings) -> Agent:
    return Agent(
        role="Behavioral Data Analyst",
        goal="Analyze supplied behavioral wellness metrics without predicting mood or calculating stress.",
        backstory=(
            "You are a careful behavioral data analyst for MoodSense AI. "
            "You explain sleep, activity, screen time, app usage, and weekly patterns using only provided data. "
            f"{SYSTEM_BOUNDARY}"
        ),
        llm=LLM(model=f"groq/{settings.model_name}", api_key=settings.groq_api_key),
        verbose=False,
        allow_delegation=False,
    )
