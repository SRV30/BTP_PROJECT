# MoodSense AI: Implementation Report

## Current Architecture

### 1. Frontend (React 19 + Tailwind 4)
*   **Framework:** Built with React 19 and Vite for high performance.
*   **Styling:** Utilizes Tailwind CSS 4 with a "neon-noir" aesthetic (slate-950 backgrounds, emerald/cyan/violet accents).
*   **State Management:** Uses a custom `AuthProvider` and `useApiResource` hook for data fetching and caching.
*   **Routing:** React Router 7 manages public (Splash, Auth) and protected (Dashboard, Logs, Analytics, Insights) routes.
*   **Visualizations:** Recharts is used for mood trends, stress heatmaps, and productivity charts.

### 2. Backend (Node.js + Express)
*   **Architecture:** Follows a Controller-Service-Model pattern.
*   **Data Models:**
    *   `DailyLog`: Granular 8-hour time slots (Morning, Afternoon, Evening).
    *   `DailyMetrics`: Aggregated daily totals with mood/stress scores.
    *   `AgentReports`: Stores structured AI analysis results.
*   **Engines:**
    *   `MoodEngine`: Calculates mood scores based on sleep, steps, and app usage.
    *   `StressEngine`: Weighs environmental factors (screen time, social usage) against wellness activities.
    *   `DepressionRiskService`: Analyzes 7-day trends to identify risk levels.

### 3. AI Service (FastAPI + CrewAI)
*   **Core:** A Python FastAPI service orchestrating 5 CrewAI agents.
*   **Agents:**
    1.  **Behavior Agent:** Analyzes activity patterns.
    2.  **Mood & Stress Agent:** Evaluates emotional state.
    3.  **Depression Risk Agent:** Performs secondary risk analysis (non-medical).
    4.  **Prediction Agent:** Forecasts tomorrow's state.
    5.  **Wellness Coach Agent:** Generates 3 actionable recommendations.
*   **LLM:** Uses Groq (via CrewAI) for fast inference of structured JSON reports.

---

## Existing Features
*   **3-Slot Logging:** Users log sleep, steps, and screen time for Morning (0-8h), Afternoon (8-16h), and Evening (16-24h).
*   **Real-time Dashboard:** Dynamic override logic that displays "Live" data from logs before they are aggregated into the daily summary.
*   **Automated Aggregation:** Backend triggers metric refreshes on every log update, ensuring scores are always current.
*   **Trend Analytics:** Weekly mood trends, stress heatmaps, and productivity scoring.
*   **AI Insights:** Deep-dive analysis of behavior patterns with personalized wellness coaching.

---

## Missing Features
*   **Goal Integration:** While the `Goal` model exists, a full-featured "Goal Tracking" UI page is not yet visible in the main navigation.
*   **Reflection Journaling:** Limited frontend support for the `Reflection` model (journaling).
*   **Notification System:** Lack of proactive alerts for high-stress detected or missed logs.
*   **Export Functionality:** Users cannot currently export their wellness data (PDF/CSV).

---

## Technical Debt
*   **Date Synchronization:** The frontend uses `toISOString().split('T')[0]` for "Today" detection, which can lead to timezone mismatches.
*   **Error Boundaries:** The AI service integration is "fail-soft", but the UI could benefit from clearer error states.
*   **Controller Redundancy:** Some backend controllers contain unreachable code after `res.json()` calls.

---

## Recommended Next Steps
1.  **Standardize Date Logic:** Implement a utility to handle local-to-UTC transitions consistently.
2.  **Finalize AI Service Configuration:** Ensure the `AI_SERVICE_URL` is robustly handled.
3.  **Goal & Reflection UI:** Build out the dedicated pages for Goal setting and Reflection history.
4.  **Metric Accuracy:** Verify the summation logic for `screenTime` across slots.
