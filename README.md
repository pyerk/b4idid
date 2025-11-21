# b4idid

## 🚀 Deployment Status

This project is automatically deployed to Vercel when changes are pushed to the `main` branch.

- **GitHub Repository**: https://github.com/pyerk/b4idid
- **Vercel Deployment**: Auto-deploys from GitHub
- **Status**: ✅ Connected and ready

## Setup Instructions

To connect this project to the GitHub repository:

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Follow the installation wizard

2. **Run the setup script**:
   ```powershell
   .\setup-git.ps1
   ```

3. **Configure your Git identity** (if not already done):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

4. **Make your first commit and push**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

## Manual Setup (Alternative)

If you prefer to set up manually:

```bash
# Initialize git repository
git init

# Add remote (replace YOUR_PAT with your Personal Access Token)
git remote add origin https://YOUR_PAT@github.com/pyerk/b4idid.git

# Verify remote
git remote -v

# Add, commit, and push
git add .
git commit -m "Initial commit"
git push -u origin main
```
