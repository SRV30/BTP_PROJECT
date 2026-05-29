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
```

### 2. Frontend Setup

```bash
cd moodsense
npm install
npm run dev
```

The Vite frontend runs on `http://localhost:5173` by default.

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

The forgot/reset password routes are also mounted at root-level aliases:

- `POST /forgot-password`
- `POST /reset-password/:token`

> Email delivery is intentionally not integrated yet. The forgot-password endpoint returns the generated reset token for development/testing.

## Authentication Notes

- Passwords are hashed with `bcryptjs` before they are saved.
- JWTs are signed with `JWT_SECRET` and expire according to `JWT_EXPIRES_IN`.
- User emails are normalized to lowercase and validated for uniqueness.
- Password reset tokens are generated with Node's `crypto` module, stored as SHA-256 hashes, and expire after 10 minutes.

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
