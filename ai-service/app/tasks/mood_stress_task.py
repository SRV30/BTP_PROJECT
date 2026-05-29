from crewai import Agent, Task

from app.utils.prompts import MOOD_STRESS_TASK_PROMPT


def create_mood_stress_task(agent: Agent, context: list[Task] | None = None) -> Task:
    return Task(
        description=MOOD_STRESS_TASK_PROMPT,
        expected_output='A JSON object with keys "moodAnalysis" and "stressAnalysis" and no extra text.',
        agent=agent,
        context=context or [],
    )
