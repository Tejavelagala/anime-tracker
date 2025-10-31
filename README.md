# 🎬 Anime & TV Series Tracker

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb)

**A modern, full-stack web application for tracking anime and TV series with AI-powered recommendations**

[📖 Deployment Guide](./DEPLOYMENT_GUIDE.md) | [🚀 Quick Start](#-quick-start) | [✨ Features](#-features)

</div>

---

## ✨ Features

- 📺 Watchlist Management with 6 status categories
- 🤖 AI-Powered Recommendations
- 🔍 Discover Anime via Jikan API
- 📊 Progress Tracking & Analytics
- 🏛️ Clubs & Discussion Boards
- ⭐ Ratings & Polls
- 🎬 Streaming Platform Integration (7+ platforms)
- 🌓 Dark/Light Mode
- 🔐 JWT Authentication
- ⚙️ Admin Panel

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/anime-tracker.git
cd anime-tracker
npm install
cd server && npm install && cd ..
```

### 2. Configure Environment
Create `server/.env`:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_min_32_chars
JWT_EXPIRE=7d
PORT=5000
```

### 3. Run Application
```bash
# Backend (terminal 1)
cd server && npm start

# Frontend (terminal 2)
npm run dev
```

Open http://localhost:5173

---

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deploying to:
- MongoDB Atlas
- Render (Backend)
- Vercel (Frontend)

Quick deploy:
```bash
deploy.bat
```

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Axios  
**Backend:** Node.js, Express, MongoDB, JWT  
**APIs:** Jikan API v4

---

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [PROJECT_COMPLETION_REPORT.md](./PROJECT_COMPLETION_REPORT.md) - Feature checklist
- [CHECK_ADMIN_ROLE.md](./CHECK_ADMIN_ROLE.md) - Admin role verification
- [README_FULLSTACK.md](./README_FULLSTACK.md) - Technical details

---

<div align="center">

**⭐ Star this repo if helpful!**

Made with ❤️ | React + Node.js + MongoDB

</div>
