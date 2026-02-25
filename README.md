# Resume Analyzer Frontend (Vercel Ready)

## Deploy On Vercel
1. Push repo to GitHub.
2. In Vercel, click **New Project** and import this repo.
3. Set **Root Directory** to `frontend`.
4. Keep defaults:
- Build Command: `npm run build`
- Output Directory: `dist`
5. Add Environment Variable:
- `VITE_API_BASE_URL=https://<your-backend-domain>/api`
6. Deploy.

`vercel.json` already includes SPA rewrite so React Router routes work on refresh.

## Local Run
```bash
npm install
npm run dev
```
