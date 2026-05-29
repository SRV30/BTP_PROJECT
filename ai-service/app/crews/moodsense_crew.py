import json
import logging
import re
from typing import Any

from crewai import Crew, Process
from pydantic import ValidationError

from app.agents.behavior_agent import create_behavior_agent
from app.agents.depression_agent import create_depression_agent
from app.agents.mood_stress_agent import create_mood_stress_agent
from app.agents.prediction_agent import create_prediction_agent
from app.agents.wellness_agent import create_wellness_agent
from app.config.settings import Settings
from app.schemas.request import AnalysisRequest
from app.schemas.response import Recommendation
from app.tasks.behavior_task import create_behavior_task
from app.tasks.depression_task import create_depression_task
from app.tasks.mood_stress_task import create_mood_stress_task
from app.tasks.prediction_task import create_prediction_task
from app.tasks.wellness_task import create_wellness_task
from app.utils.logger import get_logger, log_event

logger = get_logger(__name__)


class CrewAIExecutionError(RuntimeError):
    """Raised when CrewAI or Groq fails to produce usable analysis."""


class MoodSenseCrew:
    """Sequential CrewAI orchestration for MoodSense analysis explanations."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def run(self, request: AnalysisRequest) -> dict[str, Any]:
        if not self.settings.groq_api_key:
            raise CrewAIExecutionError("GROQ_API_KEY is required to run CrewAI analysis")

        log_event(
            logger,
            logging.INFO,
            "Crew Start",
            event="crew_start",
            userId=request.userId,
            currentDate=request.currentDate.isoformat(),
        )

        behavior_agent = create_behavior_agent(self.settings)
        mood_stress_agent = create_mood_stress_agent(self.settings)
        depression_agent = create_depression_agent(self.settings)
        prediction_agent = create_prediction_agent(self.settings)
        wellness_agent = create_wellness_agent(self.settings)

        behavior_task = create_behavior_task(behavior_agent)
        mood_stress_task = create_mood_stress_task(mood_stress_agent, context=[behavior_task])
        depression_task = create_depression_task(depression_agent, context=[behavior_task, mood_stress_task])
        prediction_task = create_prediction_task(prediction_agent, context=[behavior_task])
        wellness_task = create_wellness_task(
            wellness_agent,
            context=[behavior_task, mood_stress_task, depression_task, prediction_task],
        )

        crew = Crew(
            agents=[behavior_agent, mood_stress_agent, depression_agent, prediction_agent, wellness_agent],
            tasks=[behavior_task, mood_stress_task, depression_task, prediction_task, wellness_task],
            process=Process.sequential,
            verbose=False,
        )

        try:
            crew.kickoff(inputs=request.model_dump(mode="json"))
            task_outputs = [
                ("Behavior Agent", behavior_task.output, "behavior task"),
                ("Mood & Stress Agent", mood_stress_task.output, "mood and stress task"),
                ("Depression Risk Agent", depression_task.output, "depression risk task"),
                ("Prediction Agent", prediction_task.output, "prediction task"),
                ("Wellness Coach Agent", wellness_task.output, "wellness task"),
            ]
            result = {}
            for agent_name, task_output, task_name in task_outputs:
                log_event(
                    logger,
                    logging.INFO,
                    "Agent Execution",
                    event="agent_execution",
                    userId=request.userId,
                    currentDate=request.currentDate.isoformat(),
                    agent=agent_name,
                )
                result.update(self._parse_task_output(task_output, task_name))
            result["recommendations"] = self._validate_recommendations(result.get("recommendations"))
            if "This is not a medical diagnosis." not in result.get("depressionAnalysis", ""):
                result["depressionAnalysis"] = (
                    f"{result.get('depressionAnalysis', '').strip()} This is not a medical diagnosis."
                ).strip()

            log_event(
                logger,
                logging.INFO,
                "Crew Completion",
                event="crew_completion",
                userId=request.userId,
                currentDate=request.currentDate.isoformat(),
            )
            return result
        except (json.JSONDecodeError, ValidationError, KeyError, TypeError, ValueError) as error:
            log_event(
                logger,
                logging.ERROR,
                "CrewAI output parsing failed",
                event="crew_output_error",
                userId=request.userId,
                currentDate=request.currentDate.isoformat(),
                error=str(error),
            )
            raise CrewAIExecutionError("CrewAI returned an invalid structured response") from error
        except Exception as error:
            log_event(
                logger,
                logging.ERROR,
                "CrewAI execution failed",
                event="crew_error",
                userId=request.userId,
                currentDate=request.currentDate.isoformat(),
                error=str(error),
            )
            raise CrewAIExecutionError("CrewAI or Groq failed during analysis") from error

    @staticmethod
    def _parse_task_output(output: Any, task_name: str) -> dict[str, Any]:
        raw_output = getattr(output, "raw", None) or str(output)
        json_match = re.search(r"\{.*\}", raw_output, re.DOTALL)
        if not json_match:
            raise ValueError(f"{task_name} did not return JSON")
        parsed = json.loads(json_match.group(0))
        if not isinstance(parsed, dict):
            raise ValueError(f"{task_name} did not return a JSON object")
        return parsed

    @staticmethod
    def _validate_recommendations(recommendations: Any) -> list[dict[str, str]]:
        if not isinstance(recommendations, list):
            raise ValueError("recommendations must be a list")
        validated = [Recommendation.model_validate(item).model_dump() for item in recommendations[:3]]
        if len(validated) != 3:
            raise ValueError("wellness task must return exactly three recommendations")
        return validated
