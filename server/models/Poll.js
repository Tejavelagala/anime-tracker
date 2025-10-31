import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  contextId: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: [true, 'Poll question is required'],
    trim: true
  },
  options: [{
    text: String,
    votes: {
      type: Number,
      default: 0
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  voters: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    optionIndex: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Poll', pollSchema);
