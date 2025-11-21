# Installing Node.js

Node.js is not currently installed on your system. Follow these steps to install it:

## Quick Installation Steps

### Option 1: Official Installer (Recommended)

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Click "Download Node.js (LTS)" - this is the recommended stable version
   - The LTS version is currently recommended for most users

2. **Run the Installer:**
   - Run the downloaded `.msi` file
   - Follow the installation wizard
   - **Important:** Make sure to check "Add to PATH" during installation (it's usually checked by default)

3. **Verify Installation:**
   - Close and reopen your terminal/PowerShell
   - Run: `node --version`
   - Run: `npm --version`
   - You should see version numbers for both

4. **Install Project Dependencies:**
   - Navigate to your project folder: `cd C:\Users\brayp\OneDrive\Desktop\b4idid`
   - Run: `npm install`
   - This will install all dependencies including Sharp for image processing

### Option 2: Using Chocolatey (If you have it)

If you have Chocolatey package manager installed:

```powershell
choco install nodejs-lts
```

### Option 3: Using Winget (Windows Package Manager)

If you have Windows 11 or Windows 10 with winget:

```powershell
winget install OpenJS.NodeJS.LTS
```

## After Installation

Once Node.js is installed:

1. **Restart your terminal/PowerShell** (important for PATH to update)

2. **Verify installation:**
   ```powershell
   node --version
   npm --version
   ```

3. **Install project dependencies:**
   ```powershell
   cd C:\Users\brayp\OneDrive\Desktop\b4idid
   npm install
   ```

4. **Start the development server:**
   ```powershell
   npm run dev
   ```

## What Gets Installed

When you run `npm install`, it will install:
- All project dependencies from `package.json`
- **Sharp** - Image processing library for thumbnails
- Next.js and React dependencies
- Supabase and Stripe libraries
- All other required packages

## Troubleshooting

### If node/npm commands don't work after installation:
1. Close and reopen your terminal
2. Check if Node.js is in your PATH:
   ```powershell
   $env:PATH -split ';' | Select-String nodejs
   ```
3. If not found, you may need to manually add it to PATH or reinstall

### If npm install fails:
- Make sure you're in the project directory
- Check your internet connection
- Try running PowerShell as Administrator

## Next Steps

After installing Node.js and running `npm install`:

1. ✅ Your project dependencies will be installed
2. ✅ You can run `npm run dev` to start the development server
3. ✅ You can access your admin dashboard at `http://localhost:3000/admin`
4. ✅ You can start uploading photos!

Let me know once Node.js is installed and I can help you run `npm install`!

