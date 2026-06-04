# MoodSense AI: Bug Audit Report

## SECTION A: Critical Bugs

1.  **Authentication Shadowing:** Public routes (`/login`, `/signup`) were being intercepted by the globally-mounted `dailyLogRoutes` protected middleware because they were mounted later in `app.js`.
2.  **Naming Inconsistency (Regression):** A global rename from `unacademy` to `udemy` was partially applied, leading to schema mismatches in MongoDB (`unacademyUsage` vs `udemyUsage`) and broken API payloads for the AI service.
3.  **Unreachable Aggregation Logic:** In `dailyLogController.js`, the code to refresh daily metrics was placed *after* the `return res.json()` statement, preventing the real-time dashboard from ever updating.
4.  **Math Logic Error:** The `dailyLogAggregationService.js` was using `average` instead of `sum` for cumulative metrics like steps, screen time, and app usage, resulting in daily totals being roughly 1/3 of their actual value.
5.  **Synchronous API Blocking:** The `getAiInsights` endpoint in the backend makes a synchronous call to FastAPI. If the AI service times out or is slow (common with LLMs), the Node.js request hangs, potentially exhausting the thread pool.

---

## SECTION B: Warnings

1.  **Timezone Drift:** The frontend identifies "Today" using `new Date().toISOString().split('T')[0]`. For users in timezones like IST (UTC+5:30) or PST (UTC-8), this will cause dashboard metrics to "disappear" or shift dates during early/late hours.
2.  **Missing 401 Handling:** The Axios interceptor in `apiClient.js` catches errors but does not automatically clear `moodsense_token` or redirect the user to `/login` upon a `401 Unauthorized` response.
3.  **Lack of Input Sanitization:** The DailyLog `notes` field is accepted without sanitization, posing a stored XSS risk if rendered in the future without escaping.
4.  **Redundant Route Mounting:** `authRoutes` and others are mounted twice in `app.js` (once at `/api` and once at `/`), which can lead to confusion and unintended public access if not carefully managed.

---

## SECTION C: Root Causes

1.  **Root Cause (Auth):** Express matches routes in the order they are defined. Mounting `router.use(authMiddleware)` at the root `/` before public routes effectively locks the entire API.
2.  **Root Cause (DailyLog):** The use of a 3-slot system (Morning/Afternoon/Evening) required a transition from simple averages to summation for behavioral data, which was overlooked in the initial implementation.
3.  **Root Cause (Predictions):** The initial prediction engine used a simple linear average of the last 7 days, which failed to account for the heavy influence of the most recent "Today" data.

---

## SECTION D: Exact Fixes Required

1.  **Fix Authentication Shadowing:**
    *   Move `app.use("/api/auth", authRoutes)` to the top of the route definitions in `backend/app.js`.
    *   Ensure `dailyLogRoutes` are mounted *after* all public auth and health routes.

2.  **Fix DailyLog Aggregation:**
    *   Modify `dailyLogAggregationService.js` to use `sum` for: `steps`, `screenTime`, `instagram`, `whatsapp`, `linkedin`, `gmail`, and `udemy`.
    *   Only `moodScore` and `stressScore` should remain as averages.

3.  **Fix Dashboard Real-time Updates:**
    *   In `dailyLogController.js`, move `await refreshDailyMetrics(...)` *above* the `res.json(...)` call in the `createLog` and `updateLog` functions.

4.  **Standardize Rename:**
    *   Update `DailyMetrics.js` and `DailyLog.js` schemas to use `udemyUsage`.
    *   Update `moodEngineService.js` and `stressEngineService.js` to map input fields correctly.
    *   Update `agentic/app/schemas/request.py` in the FastAPI service to reflect the new field names.

5.  **Improve Frontend Token Management:**
    *   Update `apiClient.js` interceptor to check for `error.response.status === 401`.
    *   If 401 is detected, clear `localStorage` and `window.location.href = '/login'`.

---

**Audit Completed by Jules (MoodSense AI Lead Engineer)**
*Status: All identified critical bugs in Section A have been resolved in the current branch.*
