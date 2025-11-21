# Vercel Environment Variables Setup

Your build is failing because Supabase environment variables are not configured in Vercel.

## Required Environment Variables

You need to add these to your Vercel project:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://auimzuragmkgkghyitsx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1aW16dXJhZ21rZ2tnaHlpdHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODIzMjUsImV4cCI6MjA3OTI1ODMyNX0.tplQ_ccioMRYUwdZjOtz9JMGxqlN4ojr0XDjUUyi3e8`

3. **SUPABASE_SERVICE_ROLE_KEY** (for admin operations)
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1aW16dXJhZ21rZ2tnaHlpdHN4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY4MjMyNSwiZXhwIjoyMDc5MjU4MzI1fQ.WIrEkrKR7FsJWqfRnkhBgTeizBljYgtHXAT5ItrdmNk`

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your `b4idid` project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Click **Add New**
   - Enter the variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter the value
   - Select environments: **Production**, **Preview**, and **Development**
   - Click **Save**
5. Repeat for all three variables

## After Adding Variables

1. **Redeploy** your project:
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Click **Redeploy**

Or push a new commit to trigger a new build.

## Optional: Stripe Variables (for later)

When you're ready to add Stripe integration:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Important Notes

- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- `SUPABASE_SERVICE_ROLE_KEY` should be kept secret (not exposed to browser)
- After adding variables, you must redeploy for them to take effect

