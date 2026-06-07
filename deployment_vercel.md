# MoodSense AI - Deployment Guide (Vercel & Render)

## 1. Architecture Diagram

`Frontend (Vercel)` <-> `Backend (Render)` <-> `Agentic API (Render)` <-> `Groq (LLM)`
                          |
                          v
                   `MongoDB (Atlas)`

## 2. Prerequisites
- [Vercel Account](https://vercel.com)
- [Render Account](https://render.com)
- [MongoDB Atlas Account](https://mongodb.com/atlas)
- [Groq API Key](https://console.groq.com)

## 3. MongoDB Atlas Setup
1. Create a Free Cluster (M0).
2. Go to **Network Access** and add `0.0.0.0/0` (Allow Access from Anywhere).
3. Go to **Database Access** and create a user with `readWriteAnyDatabase` role.
4. Click **Connect** -> **Drivers** and copy your `MONGO_URI`.

## 4. Backend Deployment (Render)
1. New -> Web Service.
2. Connect your GitHub Repo.
3. **Root Directory:** `backend`
4. **Runtime:** `Node`
5. **Build Command:** `npm install`
6. **Start Command:** `node server.js`
7. Add Environment Variables (see Section 7).

## 5. Agentic Service Deployment (FastAPI on Render)
1. New -> Web Service.
2. Connect your GitHub Repo.
3. **Root Directory:** `agentic`
4. **Runtime:** `Python 3`
5. **Build Command:** `pip install -r requirements.txt`
6. **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port 8000`
7. Add Environment Variables (see Section 7).

## 6. Frontend Deployment (Vercel)
1. New Project -> Import Repository.
2. **Framework Preset:** Vite.
3. **Root Directory:** `moodsense`
4. Add Environment Variables (see Section 7).
5. Deploy.

## 7. Environment Variables Reference

### Backend (Render)
- `PORT`: `5000`
- `MONGO_URI`: `mongodb+srv://...`
- `JWT_SECRET`: `your_secret`
- `CLIENT_URL`: `https://your-frontend.vercel.app`
- `AI_SERVICE_URL`: `https://your-agentic-service.onrender.com`

### Agentic (Render)
- `GROQ_API_KEY`: `gsk_...`

### Frontend (Vercel)
- `VITE_API_BASE_URL`: `https://your-backend-app.onrender.com/api`

## 8. CORS Configuration
The Backend is configured to accept credentials and allow the `CLIENT_URL`. Ensure `CLIENT_URL` does NOT have a trailing slash.

## 9. Common Errors
- **401 Unauthorized:** Ensure `JWT_SECRET` matches exactly between server and logic.
- **CORS Blocked:** Ensure `CLIENT_URL` matches your actual Vercel domain.
- **Connection Timeout:** Ensure MongoDB Atlas Network Access is set to `0.0.0.0/0`.

## 10. Verification Checklist
- [ ] Signup/Login working.
- [ ] Dashboard loading real-time metrics.
- [ ] Agent Command page generating AI insights.
- [ ] Daily Logs saving successfully.
