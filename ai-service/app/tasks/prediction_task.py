from crewai import Agent, Task

from app.utils.prompts import PREDICTION_TASK_PROMPT


def create_prediction_task(agent: Agent, context: list[Task] | None = None) -> Task:
    return Task(
        description=PREDICTION_TASK_PROMPT,
        expected_output='A JSON object with key "predictionAnalysis" and no extra text.',
        agent=agent,
        context=context or [],
    )
