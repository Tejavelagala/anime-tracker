import express from 'express';
import { protect } from '../middleware/auth.js';
import Show from '../models/Show.js';
import Club from '../models/Club.js';
import Poll from '../models/Poll.js';
import Rating from '../models/Rating.js';

const router = express.Router();

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics for logged-in user
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    // Get user's shows
    const shows = await Show.find({ userId: req.user._id });
    
    // Calculate statistics
    const totalShows = shows.length;
    const totalEpisodes = shows.reduce((sum, show) => sum + (show.totalEpisodes || 0), 0);
    const watchedEpisodes = shows.reduce((sum, show) => sum + (show.watched || 0), 0);
    const progress = totalEpisodes > 0 ? Math.round((watchedEpisodes / totalEpisodes) * 100) : 0;
    
    // Shows by status
    const showsByStatus = {
      watching: shows.filter(s => s.status === 'Watching').length,
      completed: shows.filter(s => s.status === 'Completed').length,
      onHold: shows.filter(s => s.status === 'On Hold').length,
      dropped: shows.filter(s => s.status === 'Dropped').length,
      planToWatch: shows.filter(s => s.status === 'Plan to Watch').length
    };
    
    // Get user's ratings
    const userRatings = await Rating.countDocuments({ userId: req.user._id });
    
    // Get clubs user created or is member of
    const userClubs = await Club.countDocuments({
      $or: [
        { createdBy: req.user._id },
        { members: req.user._id }
      ]
    });
    
    // Get polls created by user
    const userPolls = await Poll.countDocuments({ createdBy: req.user._id });
    
    // Recent activity - last 5 shows added/updated
    const recentShows = await Show.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('title status watched totalEpisodes updatedAt');
    
    // Completion rate
    const completedShows = showsByStatus.completed;
    const completionRate = totalShows > 0 ? Math.round((completedShows / totalShows) * 100) : 0;
    
    // Average episodes per show
    const avgEpisodesPerShow = totalShows > 0 ? Math.round(totalEpisodes / totalShows) : 0;

    res.json({
      success: true,
      stats: {
        overview: {
          totalShows,
          totalEpisodes,
          watchedEpisodes,
          overallProgress: progress,
          completionRate,
          avgEpisodesPerShow
        },
        byStatus: showsByStatus,
        social: {
          clubs: userClubs,
          polls: userPolls,
          ratings: userRatings
        },
        recentActivity: recentShows
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
