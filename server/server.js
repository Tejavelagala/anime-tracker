import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import showRoutes from './routes/shows.js';
import clubRoutes from './routes/clubs.js';
import pollRoutes from './routes/polls.js';
import dashboardRoutes from './routes/dashboard.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

// Debug: Log environment variables (remove after deployment works)
console.log('🔍 Environment Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI (first 30 chars):', process.env.MONGODB_URI?.substring(0, 30));

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://anime-tracker.vercel.app',
    'https://anime-tracker-*.vercel.app', // Allow all Vercel preview deployments
    process.env.FRONTEND_URL // Allow custom frontend URL from env
  ].filter(Boolean), // Remove undefined values
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/anime_tracker';
console.log('🔗 Attempting to connect to MongoDB...');
console.log('Connection string starts with:', MONGODB_URI.substring(0, 20));

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('Full error:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Anime Tracker API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Internal Server Error' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
