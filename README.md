# MoodSense AI

MoodSense AI is a full-stack wellness application scaffold with a React + Vite + Tailwind CSS frontend and a Node.js + Express + MongoDB backend. The project includes a polished dark-theme UI, client-side routing, protected pages, JWT authentication APIs, and password reset token support.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Context API for dummy frontend auth state

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing
- dotenv environment configuration
- nodemon development server

## Project Structure

```text
BTP_PROJECT/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── moodsense/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── cards/
│   │   │   ├── charts/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── constants/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   └── package.json
└── README.md
```

## Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend starts on `PORT` from `.env` or `5000` by default.

### Backend Environment Variables

Create `backend/.env` from `backend/.env.example`:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/moodsense
JWT_SECRET=replace-with-a-secure-random-secret
JWT_EXPIRES_IN=7d
```

### Backend Scripts

```bash
npm start      # Run the Express server with Node
npm run dev    # Run the Express server with nodemon
npm run check  # Syntax-check backend source files
npm run import:excel  # Import Excel files from the top-level data/ folder
```

### 2. Frontend Setup

```bash
cd moodsense
npm install
npm run dev
```

The Vite frontend runs on `http://localhost:5173` by default. Set `VITE_API_BASE_URL` in `moodsense/.env` to switch between local and deployed backend URLs, for example `http://localhost:5000/api` or `https://your-api.example.com/api`.

### Frontend Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build production assets
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Frontend Routes

| Route | Page |
| --- | --- |
| `/` | Splash |
| `/login` | Login |
| `/signup` | Signup |
| `/forgot-password` | Forgot Password |
| `/reset-password` | Reset Password |
| `/dashboard` | Dashboard protected route |
| `/analytics` | Analytics protected route |
| `/insights` | AI Insights protected route |
| `/predictions` | Predictions protected route |
| `/profile` | Profile protected route |

Protected frontend pages use a Context API auth provider and redirect unauthenticated users to `/login`.

## Backend API Routes

### Health

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Backend health check |
| `GET` | `/api/health` | API health check alias |

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/signup` | Register a new user and return a JWT |
| `POST` | `/api/auth/login` | Authenticate a user and return a JWT |
| `POST` | `/api/auth/logout` | Protected logout placeholder |
| `GET` | `/api/auth/me` | Return the authenticated user |
| `POST` | `/api/auth/forgot-password` | Generate a password reset token |
| `POST` | `/api/auth/reset-password/:token` | Reset password with a valid token and return a JWT |

### Mood Engine

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/mood-engine/preview` | Calculate `moodScore` and `moodLabel` from sleep, steps, screen time, and app usage without storing data |
| `POST` | `/api/mood-engine` | Protected route that calculates mood output and stores/updates the user's `DailyMetrics` record |

Mood Engine labels are normalized to `Happy`, `Neutral`, or `Sad`. The protected storage endpoint accepts `sleep` or `sleepHours`, `steps`, `screenTime`, `date`, and `appUsage` fields such as `instagram`, `whatsapp`, `linkedin`, `gmail`, and `unacademy`.

### Stress Engine

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/stress-engine/preview` | Calculate a 0-100 `stressScore`, `stressLabel`, and factor breakdown without storing data |
| `POST` | `/api/stress-engine` | Protected route that updates the authenticated user's existing `DailyMetrics` stress score for a date |

Stress Engine labels are normalized to `Low`, `Moderate`, or `High`. Inputs are `sleep` or `sleepHours`, `steps`, `screenTime`, and Instagram usage via `instagram` or `appUsage.instagram`.

### Depression Risk Indicator

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/depression-risk/preview` | Analyze provided 7-day metric data and return `Low Risk`, `Moderate Risk`, or `High Risk` without storing data |
| `GET` | `/api/depression-risk` | Protected route that analyzes the authenticated user's latest 7-day trends and updates the latest `DailyMetrics.depressionRisk` level |

The Depression Risk Indicator analyzes 7-day trends across sleep, screen time, steps, and mood history. It is only a wellness trend indicator and does not claim or replace a medical diagnosis.

The forgot/reset password routes are also mounted at root-level aliases:

- `POST /forgot-password`
- `POST /reset-password/:token`

> Email delivery is intentionally not integrated yet. The forgot-password endpoint returns the generated reset token for development/testing.

## Authentication Notes

- Passwords are hashed with `bcryptjs` before they are saved.
- JWTs are signed with `JWT_SECRET` and expire according to `JWT_EXPIRES_IN`.
- User emails are normalized to lowercase and validated for uniqueness.
- Password reset tokens are generated with Node's `crypto` module, stored as SHA-256 hashes, and expire after 10 minutes.

## Excel Data Import

The backend includes an Excel importer for the top-level `data/` folder. It reads every `.xlsx` or `.xls` file, creates users by email when they do not already exist, and inserts `DailyMetrics` records without duplicating existing user/date entries.

Expected source files:

```text
data/
├── sahil.xlsx
├── sachin.xlsx
├── sourabh.xlsx
└── abhishek.xlsx
```

Run the importer after configuring `backend/.env` with `MONGO_URI`:

```bash
cd backend
npm install
npm run import:excel
```

Optional importer settings:

- `IMPORT_DATA_DIR` can point to a custom Excel folder.
- `IMPORT_DEFAULT_PASSWORD` sets the temporary password for automatically created users.

The importer uses email as the unique user identifier and the `DailyMetrics` unique `{ userId, date }` index to avoid duplicate metric records.

## Useful Development Checks

```bash
cd backend && npm run check
cd moodsense && npm run lint
cd moodsense && npm run build
```

## Git Ignore Notes

The repository ignores backend secrets and backend dependencies:

```text
backend/.env
backend/node_modules
```
