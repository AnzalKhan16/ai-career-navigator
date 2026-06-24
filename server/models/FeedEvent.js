const mongoose = require('mongoose');

const feedEventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      default: 'Tech Enthusiast',
    },
    eventType: {
      type: String,
      enum: ['roadmap_created', 'milestone_completed', 'community_tip', 'resume_analyzed'],
      required: true,
    },
    actionText: {
      type: String,
      required: true,
      // e.g., "completed mini-project", "achieved readiness score"
    },
    target: {
      type: String,
      required: true,
      // e.g., "CNN Image Classifier", "85%"
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FeedEvent', feedEventSchema);
