# MoodSense AI Service

FastAPI microservice for the MoodSense AI analysis layer. This service uses CrewAI with Groq to explain backend-generated wellness results and produce concise insights and recommendations.

## Responsibility Boundary

The Node.js backend already calculates:

- Mood Score
- Mood Label
- Stress Score
- Stress Level
- Depression Risk
- Tomorrow Mood Prediction

CrewAI **must never calculate or override those values**. The AI service only:

- Explains results
- Analyzes behavioral patterns
- Explains risks without diagnosis
- Explains existing predictions
- Generates practical recommendations

## Architecture

```text
React PWA
↓
Node.js Backend
↓
MongoDB
↓
Mood / Stress / Depression / Prediction Engines
↓
FastAPI AI Service
↓
CrewAI
↓
Groq
↓
AI Insights
```

## Project Structure

```text
ai-service/
├── app/
│   ├── agents/
│   ├── tasks/
│   ├── crews/
│   ├── schemas/
│   ├── services/
│   ├── config/
│   ├── utils/
│   └── main.py
├── requirements.txt
├── .env
└── README.md
```

## Environment Variables

```env
GROQ_API_KEY=
MODEL_NAME=llama-3.3-70b-versatile
APP_ENV=development
LOG_LEVEL=INFO
```

## Setup

```bash
cd ai-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Routes

### `GET /`

```json
{
  "message": "MoodSense AI Service Running"
}
```

### `POST /analyze`

Accepts validated MoodSense metrics from the Node.js backend and returns structured AI analysis.

Important validation rules:

- All fields are required.
- `weeklyMoodScores` must contain exactly 7 scores from 0 to 100.
- `happyDays + neutralDays + sadDays` must equal 7.
- Extra fields are rejected.

## Caching

The service caches completed analysis by:

```text
userId + currentDate
```

If the same user/date is requested again, the cached response is returned with `cached: true` to reduce Groq calls.

## Response Shape

```json
{
  "success": true,
  "data": {
    "behaviorSummary": "...",
    "moodAnalysis": "...",
    "stressAnalysis": "...",
    "depressionAnalysis": "... This is not a medical diagnosis.",
    "predictionAnalysis": "...",
    "recommendations": [
      {
        "title": "...",
        "description": "..."
      }
    ],
    "model": "llama-3.3-70b-versatile",
    "generatedAt": "2026-05-30T00:00:00Z",
    "cached": false
  }
}
```

## Safety Notes

- The depression-risk explanation must include: `This is not a medical diagnosis.`
- The service does not provide medical advice.
- The service uses only supplied metrics and avoids unsupported claims.
