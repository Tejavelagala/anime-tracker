import express from 'express';
import { protect } from '../middleware/auth.js';
import Show from '../models/Show.js';
import Rating from '../models/Rating.js';

const router = express.Router();

// @route   GET /api/shows
// @desc    Get all shows for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const shows = await Show.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: shows.length,
      shows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/shows
// @desc    Add a new show
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const showData = {
      ...req.body,
      userId: req.user._id
    };

    const show = await Show.create(showData);
    
    res.status(201).json({
      success: true,
      message: 'Show added successfully',
      show
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/shows/:id
// @desc    Update a show
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let show = await Show.findById(req.params.id);

    if (!show) {
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    // Make sure user owns the show
    if (show.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this show'
      });
    }

    show = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Show updated successfully',
      show
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/shows/:id
// @desc    Delete a show
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);

    if (!show) {
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    // Make sure user owns the show
    if (show.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this show'
      });
    }

    await show.deleteOne();

    res.json({
      success: true,
      message: 'Show deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/shows/:id/rate
// @desc    Rate a show
// @access  Private
router.post('/:id/rate', protect, async (req, res) => {
  try {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Update or create rating
    const ratingDoc = await Rating.findOneAndUpdate(
      { showId: req.params.id, userId: req.user._id },
      { rating },
      { upsert: true, new: true }
    );

    // Get average rating
    const ratings = await Rating.find({ showId: req.params.id });
    const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    res.json({
      success: true,
      message: 'Rating saved successfully',
      rating: ratingDoc,
      average: avg,
      count: ratings.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/shows/:id/ratings
// @desc    Get ratings for a show
// @access  Private
router.get('/:id/ratings', protect, async (req, res) => {
  try {
    const ratings = await Rating.find({ showId: req.params.id });
    const avg = ratings.length > 0 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : 0;

    res.json({
      success: true,
      average: avg,
      count: ratings.length,
      ratings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
