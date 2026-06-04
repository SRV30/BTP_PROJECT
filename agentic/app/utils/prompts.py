SYSTEM_BOUNDARY = """
MoodSense AI analysis rules:
- Use only the supplied metrics in the request payload.
- Never calculate, change, override, or dispute mood score, mood label, stress score,
  stress level, depression risk, or tomorrow mood prediction.
- Explain values already produced by the Node.js engines.
- Avoid hallucinations, medical claims, diagnosis, or treatment advice.
- Keep each analysis section professional, concise, and under 150 words.
""".strip()

BEHAVIOR_TASK_PROMPT = """
Analyze behavioral metrics for {userName} on {currentDate} ({currentTimeSlot}).
Focus on sleep ({averageSleep}h), steps ({averageSteps}), screen time ({averageScreenTime}h),
Instagram ({instagramUsage} min), WhatsApp ({whatsappUsage} min), LinkedIn ({linkedinUsage} min),
Gmail ({gmailUsage} min), Udemy ({udemyUsage} min), weekly trend ({weeklyTrend}),
and weekly mood scores {weeklyMoodScores}.
Identify positive and negative behavioral patterns only.
Do not predict mood. Do not calculate stress.
Return only JSON: {{"behaviorSummary":"..."}}
""".strip()

MOOD_STRESS_TASK_PROMPT = """
Explain the already-calculated mood and stress results using the behavior summary.
Mood score: {moodScore}/100. Mood label: {moodLabel}.
Stress score: {stressScore}/100. Stress level: {stressLevel}.
Use the behavior summary from the previous task context.
Do not modify or recalculate mood or stress. Only explain why these values may align with the metrics.
Return only JSON: {{"moodAnalysis":"...","stressAnalysis":"..."}}
""".strip()

DEPRESSION_TASK_PROMPT = """
Explain the already-calculated depression risk: {depressionRisk}.
Use sleep, screen time, steps, mood history, and the behavior summary from the previous task context.
Never diagnose depression. Never claim medical certainty.
The response must include this exact sentence: This is not a medical diagnosis.
Return only JSON: {{"depressionAnalysis":"..."}}
""".strip()

PREDICTION_TASK_PROMPT = """
Explain the already-existing tomorrow mood prediction.
Tomorrow mood: {tomorrowMood}. Confidence: {tomorrowConfidence}%.
Weekly trend: {weeklyTrend}. Use the behavior summary from the previous task context.
Do not predict or change the prediction. Explain why it may be reasonable based on supplied metrics.
Return only JSON: {{"predictionAnalysis":"..."}}
""".strip()

WELLNESS_TASK_PROMPT = """
Create exactly three personalized, actionable wellness recommendations based only on supplied metrics and prior analysis.
No medical advice. Keep each recommendation clear and concise.
Use the previous task context for behavior, mood, stress, depression, and prediction analysis.
Return only JSON: {{"recommendations":[{{"title":"...","description":"..."}},{{"title":"...","description":"..."}},{{"title":"...","description":"..."}}]}}
""".strip()
