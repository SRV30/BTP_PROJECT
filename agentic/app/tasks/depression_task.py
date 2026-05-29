from crewai import Agent, Task

from app.utils.prompts import DEPRESSION_TASK_PROMPT


def create_depression_task(agent: Agent, context: list[Task] | None = None) -> Task:
    return Task(
        description=DEPRESSION_TASK_PROMPT,
        expected_output='A JSON object with key "depressionAnalysis" and the sentence "This is not a medical diagnosis.".',
        agent=agent,
        context=context or [],
    )
