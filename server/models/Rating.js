import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  showId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to prevent duplicate ratings from same user
ratingSchema.index({ showId: 1, userId: 1 }, { unique: true });

export default mongoose.model('Rating', ratingSchema);
