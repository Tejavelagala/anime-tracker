# 🚀 Deployment Guide - Anime Tracker

## Complete Guide to Deploy on GitHub and Make Publicly Accessible

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites](#prerequisites)
2. [GitHub Repository Setup](#github-repository-setup)
3. [Frontend Deployment (Vercel/Netlify)](#frontend-deployment)
4. [Backend Deployment (Render/Railway)](#backend-deployment)
5. [Database Setup (MongoDB Atlas)](#database-setup)
6. [Environment Configuration](#environment-configuration)
7. [Final Testing](#final-testing)

---

## 🔧 PREREQUISITES

### Required Accounts (All Free):
- ✅ GitHub account
- ✅ MongoDB Atlas account (free tier)
- ✅ Vercel account (for frontend) OR Netlify
- ✅ Render account (for backend) OR Railway

### Required Tools:
```bash
git --version  # Git must be installed
node --version # Node.js must be installed
```

---

## 📦 STEP 1: GITHUB REPOSITORY SETUP

### 1.1 Initialize Git Repository

Open terminal in project root:

```bash
cd C:\Users\User\OneDrive\Documents\Anime-Tracker

# Initialize git (if not already)
git init

# Create .gitignore file
```

### 1.2 Create .gitignore Files

**Root .gitignore:**
```
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.production

# Build outputs
dist/
build/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Temp files
*.tmp
```

**Server .gitignore:**
```
node_modules/
.env
*.log
```

### 1.3 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `anime-tracker`
3. Description: "Full-stack Anime & TV Series Tracker with AI Recommendations"
4. **Public** (so everyone can access)
5. **Don't** initialize with README (we have one)
6. Click "Create repository"

### 1.4 Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete Anime Tracker with all features"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/anime-tracker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 STEP 2: DATABASE SETUP (MongoDB Atlas)

### 2.1 Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Choose **FREE M0 Cluster** (512MB)
4. Select cloud provider: **AWS**
5. Region: Choose closest to your users
6. Cluster name: `anime-tracker-cluster`
7. Click "Create Cluster" (takes 3-5 minutes)

### 2.2 Configure Database Access

**Create Database User:**
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Authentication: **Username and Password**
4. Username: `animetrackeruser`
5. Password: Generate strong password (SAVE THIS!)
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

**Configure Network Access:**
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 2.3 Get Connection String

1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. Copy connection string:
```
mongodb+srv://animetrackeruser:<password>@anime-tracker-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
6. **Replace `<password>` with your actual password**
7. **Save this for later!**

---

## 🖥️ STEP 3: BACKEND DEPLOYMENT (Render.com)

### 3.1 Prepare Backend for Deployment

**Update `server/package.json`:**
```json
{
  "name": "anime-tracker-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.1"
  }
}
```

**Update `server/server.js` - Add PORT handling:**
```javascript
const PORT = process.env.PORT || 5000;
```

### 3.2 Deploy to Render

1. Go to https://render.com/ and sign up/login
2. Click "New +" → "Web Service"
3. Connect GitHub account
4. Select `anime-tracker` repository
5. Configure:
   - **Name:** `anime-tracker-backend`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

6. **Environment Variables** - Click "Advanced" and add:
```
MONGODB_URI=mongodb+srv://animetrackeruser:YOUR_PASSWORD@anime-tracker-cluster.xxxxx.mongodb.net/anime_tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRE=7d
NODE_ENV=production
```

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. **Copy your backend URL:** `https://anime-tracker-backend.onrender.com`

---

## 🎨 STEP 4: FRONTEND DEPLOYMENT (Vercel)

### 4.1 Prepare Frontend for Deployment

**Create `vite.config.js` in root (if not exists):**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
})
```

**Create environment files:**

**`.env.production` in root:**
```
VITE_API_URL=https://anime-tracker-backend.onrender.com/api
```

**Update API URLs in all components:**

Find and replace in all component files:
```javascript
// Change from:
const API_URL = 'http://localhost:5000/api'

// To:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

### 4.2 Deploy to Vercel

**Option A: Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: anime-tracker
# - In which directory is your code? ./
# - Want to override settings? N

# Deploy to production
vercel --prod
```

**Option B: Vercel Dashboard**

1. Go to https://vercel.com/
2. Sign up/login with GitHub
3. Click "Add New" → "Project"
4. Import `anime-tracker` repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (leave empty)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

6. **Environment Variables:**
```
VITE_API_URL=https://anime-tracker-backend.onrender.com/api
```

7. Click "Deploy"
8. Wait 2-3 minutes
9. **Your app URL:** `https://anime-tracker.vercel.app`

---

## 🔄 STEP 5: UPDATE BACKEND CORS

**Update `server/server.js`:**

```javascript
import cors from 'cors';

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://anime-tracker.vercel.app', // Your Vercel URL
    'https://your-custom-domain.com'    // If you have one
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

**Redeploy backend on Render:**
1. Go to Render dashboard
2. Click on your service
3. Click "Manual Deploy" → "Deploy latest commit"

---

## 📝 STEP 6: UPDATE COMPONENT API URLs

Create a config file for centralized API management:

**Create `src/config/api.js`:**
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

**Update all components to use this:**
```javascript
// In each component file
import { API_URL } from '../config/api';

// Remove local API_URL definition
// Use imported API_URL instead
```

Files to update:
- `src/components/Login.jsx`
- `src/components/Dashboard.jsx`
- `src/components/Discover.jsx` (if it uses API)
- Any other components using `http://localhost:5000`

---

## ✅ STEP 7: FINAL TESTING

### 7.1 Test Your Deployed App

1. **Open your Vercel URL:** `https://anime-tracker.vercel.app`
2. **Test Registration:**
   - Create a new account
   - Check MongoDB Atlas → Collections → users
3. **Test Login:**
   - Login with new account
   - Should redirect to dashboard
4. **Test Features:**
   - Add a show to watchlist
   - Search in Discover
   - Check AI Recommendations
   - View Dashboard statistics
   - Join a club

### 7.2 Check Browser Console

- F12 → Console tab
- Look for any errors
- Check Network tab for failed requests

### 7.3 Test Mobile Responsiveness

- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test on different screen sizes

---

## 🎉 STEP 8: SHARE YOUR APP!

### Your Live URLs:

**Frontend (Users access this):**
```
https://anime-tracker.vercel.app
```

**Backend API:**
```
https://anime-tracker-backend.onrender.com
```

**GitHub Repository:**
```
https://github.com/YOUR_USERNAME/anime-tracker
```

### Share with friends:
- 📱 Direct link: `https://anime-tracker.vercel.app`
- 🔗 GitHub: `https://github.com/YOUR_USERNAME/anime-tracker`
- 📊 Add to portfolio/resume

---

## 🔒 STEP 9: SECURITY CHECKLIST

### Production Security:

- ✅ `.env` files in `.gitignore`
- ✅ Strong JWT secret (32+ characters)
- ✅ MongoDB user with limited permissions
- ✅ CORS configured for specific domains
- ✅ Environment variables in deployment platforms
- ✅ HTTPS enabled (automatic on Vercel/Render)

### Never commit:
- ❌ `.env` files
- ❌ MongoDB connection strings
- ❌ JWT secrets
- ❌ API keys

---

## 🆓 FREE TIER LIMITS

### MongoDB Atlas (Free M0):
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ ~100 connections
- ✅ Perfect for small-medium apps

### Render (Free):
- ✅ 750 hours/month
- ✅ Sleeps after 15 min inactivity (wakes on request)
- ✅ 512 MB RAM
- ⚠️ Cold starts (first request slow)

### Vercel (Free):
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Fast CDN

---

## 🚀 CONTINUOUS DEPLOYMENT

Once set up, automatic deployment works like this:

1. Make changes locally
2. Commit: `git commit -m "Add new feature"`
3. Push: `git push origin main`
4. **Automatic deployment:**
   - Vercel deploys frontend automatically
   - Render deploys backend automatically
5. Live in ~2 minutes!

---

## 🐛 TROUBLESHOOTING

### Backend won't start:
- Check environment variables in Render
- Check MongoDB connection string
- Check logs in Render dashboard

### Frontend can't connect to backend:
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Check Network tab for 404/500 errors

### Database connection failed:
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string password
- Check database user permissions

### Cold start delay (Render free tier):
- First request after 15 min takes ~30 seconds
- Solution: Upgrade to paid tier or use cron job to ping every 10 min

---

## 📚 ADDITIONAL RESOURCES

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Guide](https://www.mongodb.com/docs/atlas/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## 🎯 QUICK DEPLOYMENT CHECKLIST

```
□ Create GitHub repository
□ Push code to GitHub
□ Create MongoDB Atlas cluster
□ Get MongoDB connection string
□ Deploy backend to Render
□ Add environment variables to Render
□ Deploy frontend to Vercel
□ Add VITE_API_URL to Vercel
□ Update CORS in backend
□ Test registration/login
□ Test all features
□ Share your live URL!
```

---

## 💡 CUSTOM DOMAIN (Optional)

### Add Custom Domain to Vercel:

1. Buy domain (e.g., from Namecheap, GoDaddy)
2. Go to Vercel → Project Settings → Domains
3. Add your domain: `animetracker.com`
4. Update DNS records as shown
5. Wait for DNS propagation (24-48 hours)

---

**You're all set!** 🎉

Your Anime Tracker is now live and accessible to everyone in the world!

*Last updated: October 31, 2025*
