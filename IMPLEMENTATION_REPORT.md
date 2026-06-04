# MoodSense AI: Implementation Report

## Current Architecture

### 1. Frontend (React 19 + Tailwind 4)
*   **Framework:** Built with React 19 and Vite for high performance.
*   **Styling:** Utilizes Tailwind CSS 4 with a "neon-noir" aesthetic.
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
    *   `StressEngine`: Weighs environmental factors against wellness activities.
    *   `PredictionEngine`: (NEW) Advanced weighted prediction model analyzing today, 7-day, and 30-day trends.
    *   `DepressionRiskService`: Analyzes 7-day trends to identify risk levels.

### 3. AI Service (FastAPI + CrewAI)
*   **Core:** A Python FastAPI service orchestrating 5 CrewAI agents.
*   **LLM:** Uses Groq (via CrewAI) for fast inference of structured JSON reports.

---

## Existing Features
*   **3-Slot Logging:** Users log sleep, steps, and screen time for Morning (0-8h), Afternoon (8-16h), and Evening (16-24h).
*   **Advanced Predictions:** Improved prediction quality using historical data (Today + Last 7/30 days) and trend adjustments.
*   **Real-time Dashboard:** Displays aggregated "Live" metrics from the current day's logs.
*   **Automated Aggregation:** Backend triggers metric refreshes (summing slots) on every log update.
*   **Trend Analytics:** Weekly mood trends, stress heatmaps, and productivity scoring.
*   **AI Insights:** Deep-dive analysis of behavior patterns with personalized wellness coaching.

---

## Missing Features
*   **Goal Integration:** While the `Goal` model exists, a dedicated UI page is not yet in the main navigation.
*   **Reflection Journaling:** Limited frontend support for the `Reflection` model.
*   **Notification System:** Lack of proactive alerts for high-stress detected or missed logs.

---

## Technical Debt
*   **Date Synchronization:** The frontend uses `toISOString().split('T')[0]` for "Today" detection, which can lead to timezone mismatches at certain hours.
*   **Error Boundaries:** The AI service integration is "fail-soft", but the UI could benefit from clearer error states.

---

## Recommended Next Steps
1.  **Goal & Reflection UI:** Build out the dedicated pages for Goal setting and Reflection history.
2.  **Notification System:** Implement WebSocket or Push notifications for wellness alerts.
3.  **Enhanced Date Handling:** Use a library like `date-fns-tz` to handle user timezones more robustly across the stack.
