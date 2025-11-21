# Troubleshooting 404 Error

## Current Status

The homepage is returning 404 errors on Vercel even though:
- ✅ Build succeeds
- ✅ File exists at `app/page.tsx`
- ✅ Layout exists at `app/layout.tsx`
- ✅ Page is minimal with no dependencies

## Possible Causes

### 1. Vercel Configuration Issue
- Check Vercel project settings
- Verify Framework Preset is set to "Next.js"
- Check if there are any custom routing rules

### 2. Build Output Issue
- The build might be succeeding but the page isn't being included in the output
- Check Vercel build logs for any warnings about the page

### 3. Runtime Error
- The page might be throwing an error during rendering that Next.js interprets as 404
- Check Vercel function logs for runtime errors

## Steps to Debug

1. **Check Vercel Deployment Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Check the "Functions" tab for any errors
   - Check the "Logs" tab for runtime errors

2. **Verify Build Output:**
   - In Vercel build logs, look for the route table
   - Should show: `○ /` (Static) or `ƒ /` (Dynamic)

3. **Check Vercel Project Settings:**
   - Settings → General
   - Framework Preset should be "Next.js"
   - Root Directory should be empty (or "." if needed)
   - Build Command: `npm run build`
   - Output Directory: `.next` (or leave empty for Next.js)

4. **Try Accessing Other Routes:**
   - Try `/contact` - does it work?
   - Try `/admin` - does it work?
   - If other routes work but `/` doesn't, it's specifically the homepage

5. **Check Environment Variables:**
   - Even though the page doesn't use them, missing env vars might cause issues
   - Add Supabase env vars in Vercel Settings → Environment Variables

## Current Page Structure

```
app/
├── layout.tsx (minimal, no imports)
├── page.tsx (minimal test page)
└── ...
```

The page is as simple as possible - just a div with text.

## Next Steps

If the page still doesn't load:
1. Check Vercel function logs for runtime errors
2. Verify the build output includes the homepage route
3. Try creating a new Vercel project and importing the repo fresh
4. Check if there are any Vercel-specific routing configurations

