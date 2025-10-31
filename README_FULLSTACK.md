# 🎬 Anime Tracker - Full Stack Application

A complete full-stack web application for tracking anime and TV series with user authentication, database persistence, and real-time API integration.

## 🚀 Features

### Frontend
- ✨ Modern React 18 with Vite
- 🎨 Tailwind CSS with animated gradients
- 🌗 Dark/Light theme toggle
- 📱 Fully responsive design
- 🔐 JWT-based authentication
- 🎭 Beautiful UI with frosted glass effects

### Backend
- 🔒 Secure user authentication (Register/Login)
- 💾 MongoDB database for data persistence
- 🛡️ JWT token-based authorization
- 📊 RESTful API architecture
- ✅ Input validation
- 🔑 Password hashing with bcrypt

### Features
- 📺 Track anime shows with progress
- ⭐ Rate shows (1-5 stars)
- 🔍 Live anime search via Jikan API
- 🏛️ Create and join clubs
- 💬 Discussion boards with posts/comments
- 📊 Interactive polls
- 📈 Personal dashboard with statistics
- ⚙️ Admin panel

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🛠️ Installation

### 1️⃣ Clone or navigate to the project

```bash
cd c:\Users\User\OneDrive\Documents\Anime-Tracker
```

### 2️⃣ Install Frontend Dependencies

```bash
npm install --legacy-peer-deps
```

### 3️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

### 4️⃣ Setup MongoDB

**Option A: Local MongoDB**
1. Install MongoDB on your system
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `.env` file with your connection string

### 5️⃣ Configure Environment Variables

The backend `.env` file is already created at `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/anime_tracker
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**⚠️ IMPORTANT**: Change `JWT_SECRET` to a strong random string for production!

## 🎯 Running the Application

### Start Backend Server

```bash
# From server directory
cd server
npm start

# Or for development with auto-reload
npm run dev
```

Backend will run on: **http://localhost:5000**

### Start Frontend

```bash
# From root directory
cd ..
npm run dev
```

Frontend will run on: **http://localhost:5173**

## 👤 User Authentication

### Register New Account
1. Navigate to http://localhost:5173
2. Click "Don't have an account? Register"
3. Fill in:
   - Username (3-30 characters)
   - Email
   - Password (min 6 characters)
   - First Name (optional)
   - Last Name (optional)
4. Click "Create Account"

### Login
1. Enter your email and password
2. Click "Sign In"
3. Your session will persist for 7 days

### Demo Account
For testing, you can create a demo account:
- Email: demo@example.com
- Password: demo123

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Profile
- `GET /api/user/profile` - Get user profile (Protected)
- `PUT /api/user/profile` - Update profile (Protected)

### Shows
- `GET /api/shows` - Get all user shows (Protected)
- `POST /api/shows` - Add new show (Protected)
- `PUT /api/shows/:id` - Update show (Protected)
- `DELETE /api/shows/:id` - Delete show (Protected)
- `POST /api/shows/:id/rate` - Rate a show (Protected)
- `GET /api/shows/:id/ratings` - Get show ratings (Protected)

### Clubs
- `GET /api/clubs` - Get all clubs (Protected)
- `POST /api/clubs` - Create club (Protected)
- `POST /api/clubs/:id/posts` - Add post (Protected)
- `POST /api/clubs/:clubId/posts/:postId/comments` - Add comment (Protected)

### Polls
- `GET /api/polls/:contextId` - Get polls (Protected)
- `POST /api/polls` - Create poll (Protected)
- `POST /api/polls/:id/vote` - Vote on poll (Protected)

## 🗄️ Database Schema

### User
```javascript
{
  username: String (unique, 3-30 chars),
  email: String (unique, valid email),
  password: String (hashed, min 6 chars),
  firstName: String,
  lastName: String,
  avatar: String,
  createdAt: Date
}
```

### Show
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  totalEpisodes: Number,
  watched: Number,
  tags: [String],
  status: Enum,
  description: String,
  spoiler: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Club
```javascript
{
  name: String (unique),
  createdBy: ObjectId (ref: User),
  members: [ObjectId],
  posts: [{
    author: String,
    authorId: ObjectId,
    content: String,
    createdAt: Date,
    comments: [...]
  }],
  createdAt: Date
}
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Input validation & sanitization
- ✅ MongoDB injection prevention
- ✅ CORS enabled
- ✅ Secure password requirements

## 🎨 Technology Stack

### Frontend
- React 18.2.0
- Vite 5.1.0
- Tailwind CSS 3.4.7
- React Router DOM 6.17.0
- Axios 1.6.0

### Backend
- Node.js with Express 4.18.2
- MongoDB with Mongoose 8.0.0
- JWT (jsonwebtoken 9.0.2)
- Bcrypt (bcryptjs 2.4.3)
- Express Validator 7.0.1

## 📱 Features Walkthrough

1. **Register/Login** - Secure authentication system
2. **Watchlist** - Add and track anime shows
3. **Discover** - Search anime via Jikan API
4. **Progress Tracking** - Track episodes watched
5. **Ratings** - Rate shows 1-5 stars
6. **Clubs** - Create communities and discuss
7. **Polls** - Create and vote on polls
8. **Dashboard** - View your statistics
9. **Admin Panel** - Manage your data

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl status mongod
```

### Port Already in Use
```bash
# Change PORT in server/.env
PORT=5001
```

### CORS Errors
- Make sure backend is running on port 5000
- Frontend should be on port 5173
- Check CORS configuration in server.js

## 📄 License

MIT License

## 👨‍💻 Author

Anime Tracker Team

---

**🎉 Enjoy tracking your favorite anime! 🎉**
