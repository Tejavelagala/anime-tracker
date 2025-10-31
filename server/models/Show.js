import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  totalEpisodes: {
    type: Number,
    required: true,
    min: 1
  },
  watched: {
    type: Number,
    default: 0,
    min: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
    default: 'Plan to Watch'
  },
  description: {
    type: String,
    default: ''
  },
  spoiler: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  streamingLinks: {
    netflix: { type: String, default: '' },
    crunchyroll: { type: String, default: '' },
    funimation: { type: String, default: '' },
    hulu: { type: String, default: '' },
    amazonPrime: { type: String, default: '' },
    disneyPlus: { type: String, default: '' },
    other: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

showSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Show', showSchema);
