from crewai import Agent, Task

from app.utils.prompts import BEHAVIOR_TASK_PROMPT


def create_behavior_task(agent: Agent) -> Task:
    return Task(
        description=BEHAVIOR_TASK_PROMPT,
        expected_output='A JSON object with key "behaviorSummary" and no extra text.',
        agent=agent,
    )
