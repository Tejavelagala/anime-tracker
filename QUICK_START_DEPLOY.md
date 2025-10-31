# 🚀 QUICK START - Deploy in 15 Minutes!

Follow these steps in order:

## Step 1: Push to GitHub (2 minutes)

1. **Create GitHub repository:** https://github.com/new
   - Name: `anime-tracker`
   - Make it **Public**
   - Don't initialize with README

2. **Update remote URL** (replace YOUR_USERNAME with your actual GitHub username):
   ```powershell
   git remote remove origin
   git remote add origin https://github.com/YOUR_USERNAME/anime-tracker.git
   ```

3. **Push code:**
   ```powershell
   git add .
   git commit -m "Prepare for deployment"
   git push -u origin master
   ```

## Step 2: Setup MongoDB Atlas (3 minutes)

1. **Sign up:** https://www.mongodb.com/cloud/atlas/register
2. **Create FREE M0 cluster**
3. **Create database user** and save password
4. **Whitelist all IPs:** 0.0.0.0/0
5. **Get connection string** and save it

## Step 3: Deploy Backend to Render (5 minutes)

1. **Sign up:** https://render.com/ (use GitHub)
2. **New Web Service** → Connect `anime-tracker` repo
3. **Settings:**
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Environment Variables:**
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: `anime-tracker-jwt-secret-2025-production-min32`
   - `JWT_EXPIRE`: `7d`
   - `NODE_ENV`: `production`
5. **Deploy** and save your backend URL

## Step 4: Deploy Frontend to Vercel (3 minutes)

1. **Sign up:** https://vercel.com/ (use GitHub)
2. **Import** `anime-tracker` repository
3. **Environment Variable:**
   - `VITE_API_URL`: `https://your-backend.onrender.com/api`
4. **Deploy** and save your frontend URL

## Step 5: Test (2 minutes)

1. Open your Vercel URL
2. Create an account
3. Test features

## 🎉 Done! Share your app!

**Detailed instructions:** See `DEPLOYMENT_CHECKLIST.md`

