# Deployment Guide (Vercel + Railway)

## Architecture
- Frontend: Vite/React app deployed on Vercel
- Backend: Express API deployed on Railway

## 1) Deploy Backend to Railway
1. Push this repository to GitHub.
2. In Railway, create a new project from the GitHub repo.
3. Set the service root directory to `backend`.
4. Railway will use `backend/railway.toml` and run `npm start`.
5. Add environment variables in Railway:
   - `FRONTEND_ORIGIN=https://<your-vercel-domain>`
   - `PORT=8080` (optional; Railway usually injects this)
6. Deploy and copy the public Railway URL.
7. Verify health endpoint:
   - `https://<railway-url>/api/health`

## 2) Deploy Frontend to Vercel
1. Import the same GitHub repository in Vercel.
2. Build settings are auto-detected from `vercel.json`.
3. Add environment variable in Vercel:
   - `VITE_API_URL=https://<railway-url>`
4. Deploy.

## 3) CORS Alignment
- If Vercel domain changes (preview/prod), update Railway `FRONTEND_ORIGIN` to match the active frontend domain.

## 4) Local Development
- Frontend:
  - `npm install`
  - `npm run dev`
- Backend:
  - `cd backend`
  - `npm install`
  - `npm run dev`
- Set frontend env locally in project root `.env`:
  - `VITE_API_URL=http://localhost:8080`

## Notes
- Frontend has a fallback project list; if backend is unreachable, UI still renders.
- Backend exposes:
  - `GET /api/health`
  - `GET /api/projects`
