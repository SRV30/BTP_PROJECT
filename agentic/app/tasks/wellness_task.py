from crewai import Agent, Task

from app.utils.prompts import WELLNESS_TASK_PROMPT


def create_wellness_task(agent: Agent, context: list[Task] | None = None) -> Task:
    return Task(
        description=WELLNESS_TASK_PROMPT,
        expected_output='A JSON object with exactly three recommendation objects containing title and description.',
        agent=agent,
        context=context or [],
    )
