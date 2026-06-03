# MoodSense AI - Implementation Report

## Current Architecture
MoodSense AI is a microservices-inspired wellness platform comprising three primary layers:
*   **Frontend (React 19 + Vite 8 + Tailwind 4)**: A high-performance, dark-themed Single Page Application (SPA). It uses **Recharts** for visualizing wellness trends and **Context API** for authentication state. Communication is via `axios` to the Node.js backend.
*   **Backend (Node.js + Express + MongoDB)**: The central business logic hub. It manages user authentication (JWT), data persistence (Mongoose), and rule-based scoring engines for Mood, Stress, and Depression Risk. It orchestrates requests to the AI service and manages a MongoDB-based persistence cache for AI reports.
*   **AI Service (FastAPI + CrewAI + Groq)**: A Python-based intelligence layer. It uses **CrewAI** to orchestrate five specialized agents (Behavior, Mood & Stress, Depression, Prediction, and Wellness Coach) powered by **Llama-3.3-70b-versatile** via Groq for explaining user metrics.

## Existing Features
*   **Secure Authentication**: Full JWT-based flow including signup, login, and tokenized password reset (token generated and stored as SHA-256).
*   **Automated Wellness Engines**: Rule-based heuristics that calculate scores for Mood, Stress, and Depression Risk automatically when daily metrics are saved.
*   **Multi-Agent Contextual Insights**: The AI service provides more than just summaries; it explains the "why" behind scores and gives exactly three personalized wellness recommendations.
*   **Interactive Analytics Dashboard**: Visualization of mood trends, stress heatmaps, and productivity scores (calculated from steps, sleep, and focused app usage).
*   **Bulk Data Ingestion**: An Excel importer that creates users and metrics from spreadsheets, facilitating development and testing.

## Missing Features
*   **Email Integration**: The forgot-password flow currently returns the reset token in the API response rather than sending an actual email.
*   **Real-time Alerts**: No mechanism for proactive notifications if a user's depression risk or stress score reaches a critical threshold.
*   **Goal Management UI**: While backend models exist for `Goal`, `Reflection`, and `DailyLog`, the current frontend focus is primarily on analytics and insights.
*   **Shared AI Cache**: The FastAPI service uses an in-memory lock-based cache, which is not shared across multiple instances of the service.

## Technical Debt
*   **Latency in AI Pipeline**: The `MoodSenseCrew` runs sequentially. Users wait for all five agents to finish before receiving insights, leading to typical wait times of several seconds.
*   **Logic Redundancy**: Rules for what constitutes "High Stress" or "Low Mood" are partially duplicated in Node.js services (`moodEngineService.js`) and in the system prompts for the AI agents.
*   **Monolithic Controller**: `appDataController.js` handles massive amounts of data transformation and mapping between database models and frontend expectations.
*   **Hardcoded Thresholds**: Scoring parameters (e.g., "7 hours of sleep is healthy") are hardcoded constants rather than configurable parameters.

## Recommended Next Steps
*   **Performance Optimization**: Refactor `MoodSenseCrew` to use parallel task execution for independent agents (Behavior, Prediction) to reduce user wait time.
*   **Service Integration**: Implement a mailer service (e.g., Nodemailer with AWS SES) to enable real password resets and wellness alerts.
*   **Scalability**: Migrate the FastAPI in-memory cache to Redis to support horizontally scaled AI workers.
*   **UI Expansion**: Build out the Goal Tracking and Daily Reflection pages to utilize the existing backend models.
