import express from 'express';
import { protect } from '../middleware/auth.js';
import Poll from '../models/Poll.js';

const router = express.Router();

// @route   GET /api/polls/:contextId
// @desc    Get polls for a context (show/club)
// @access  Private
router.get('/:contextId', protect, async (req, res) => {
  try {
    const polls = await Poll.find({ contextId: req.params.contextId });
    res.json({
      success: true,
      count: polls.length,
      polls
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/polls
// @desc    Create a new poll
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { contextId, question, options } = req.body;

    const poll = await Poll.create({
      contextId,
      question,
      options: options.map(opt => ({ text: opt, votes: 0 })),
      createdBy: req.user._id,
      voters: []
    });

    res.status(201).json({
      success: true,
      message: 'Poll created successfully',
      poll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/polls/:id/vote
// @desc    Vote on a poll
// @access  Private
router.post('/:id/vote', protect, async (req, res) => {
  try {
    const { optionIndex } = req.body;
    
    const poll = await Poll.findById(req.params.id);
    
    if (!poll) {
      return res.status(404).json({
        success: false,
        message: 'Poll not found'
      });
    }

    // Check if user already voted
    const existingVote = poll.voters.find(
      v => v.userId.toString() === req.user._id.toString()
    );

    if (existingVote) {
      // Update existing vote
      poll.options[existingVote.optionIndex].votes -= 1;
      poll.options[optionIndex].votes += 1;
      existingVote.optionIndex = optionIndex;
    } else {
      // New vote
      poll.options[optionIndex].votes += 1;
      poll.voters.push({
        userId: req.user._id,
        optionIndex
      });
    }

    await poll.save();

    res.json({
      success: true,
      message: 'Vote recorded successfully',
      poll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
