import express from 'express';
import { protect } from '../middleware/auth.js';
import Club from '../models/Club.js';

const router = express.Router();

// @route   GET /api/clubs
// @desc    Get all clubs
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const clubs = await Club.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: clubs.length,
      clubs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/clubs
// @desc    Create a new club
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name } = req.body;

    const club = await Club.create({
      name,
      createdBy: req.user._id,
      members: [req.user._id]
    });

    res.status(201).json({
      success: true,
      message: 'Club created successfully',
      club
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/clubs/:id/posts
// @desc    Add post to club
// @access  Private
router.post('/:id/posts', protect, async (req, res) => {
  try {
    const { content } = req.body;
    
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }

    club.posts.push({
      author: req.user.username,
      authorId: req.user._id,
      content,
      createdAt: new Date(),
      comments: []
    });

    await club.save();

    res.json({
      success: true,
      message: 'Post added successfully',
      club
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/clubs/:clubId/posts/:postId/comments
// @desc    Add comment to post
// @access  Private
router.post('/:clubId/posts/:postId/comments', protect, async (req, res) => {
  try {
    const { content } = req.body;
    
    const club = await Club.findById(req.params.clubId);
    
    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }

    const post = club.posts.id(req.params.postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    post.comments.push({
      author: req.user.username,
      authorId: req.user._id,
      content,
      createdAt: new Date()
    });

    await club.save();

    res.json({
      success: true,
      message: 'Comment added successfully',
      club
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
