# Deploy to Vercel

## 1. Environment Variables

Add the following environment variables to your Vercel Project Settings (Settings -> Environment Variables):

| Variable | Value (To Be Added) |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ridltynxeodzhznaczrg.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(Your Pub Key provided earlier)* |

## 2. Build Settings

- **Value**: Standard Next.js (Default)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (Default)
- **Install Command**: `npm install` (Default)

## 3. Deployment Steps

1.  Push changes to GitHub (Done automatically).
2.  Go to Vercel Dashboard -> Add New -> Project.
3.  Import from GitHub -> Select `App_Monetly`.
4.  Configure Environment Variables.
5.  Click Deploy.
