import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import User from '../models/User.js';
import Show from '../models/Show.js';
import Club from '../models/Club.js';
import Poll from '../models/Poll.js';
import Rating from '../models/Rating.js';

const router = express.Router();

// @route   GET /api/admin/stats
// @desc    Get system-wide statistics (Admin only)
// @access  Private + Admin
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    // Total counts
    const totalUsers = await User.countDocuments();
    const totalShows = await Show.countDocuments();
    const totalClubs = await Club.countDocuments();
    const totalPolls = await Poll.countDocuments();
    const totalRatings = await Rating.countDocuments();
    
    // User registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsers = await User.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo } 
    });
    
    // Active users (users with shows)
    const activeUsers = await Show.distinct('userId').countDocuments();
    
    // Most popular shows
    const popularShows = await Show.aggregate([
      { $group: { _id: '$title', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // Average shows per user
    const avgShowsPerUser = totalUsers > 0 ? Math.round(totalShows / totalUsers) : 0;
    
    // Recent users
    const recentUsers = await User.find()
      .select('username email createdAt role')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      stats: {
        overview: {
          totalUsers,
          totalShows,
          totalClubs,
          totalPolls,
          totalRatings,
          activeUsers,
          newUsers,
          avgShowsPerUser
        },
        popularShows,
        recentUsers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users (Admin only)
// @access  Private + Admin
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role (Admin only)
// @access  Private + Admin
router.put('/users/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be "user" or "admin"'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
