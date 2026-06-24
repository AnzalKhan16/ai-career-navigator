const FeedEvent = require('../models/FeedEvent');

// @desc    Get latest community feed events
// @route   GET /api/community
// @access  Public or Private (depending on your setup)
const getFeedEvents = async (req, res) => {
  try {
    // Fetch latest 20 events, sorted by newest first
    const events = await FeedEvent.find()
      .sort({ createdAt: -1 })
      .limit(20);

    // Map to the format the frontend expects:
    // { id, user, role, action, target, time, likes, comments }
    const formattedEvents = events.map(event => {
      // Calculate a rough "time ago" string
      const diffMs = new Date() - new Date(event.createdAt);
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      let timeAgo = 'Just now';
      if (diffDays > 0) timeAgo = `${diffDays}d ago`;
      else if (diffHours > 0) timeAgo = `${diffHours}h ago`;

      return {
        id: event._id,
        user: event.userName,
        role: event.userRole,
        action: event.actionText,
        target: event.target,
        time: timeAgo,
        likes: event.likes,
        comments: event.comments
      };
    });

    res.json(formattedEvents);
  } catch (error) {
    console.error('Error fetching community feed:', error);
    res.status(500).json({ message: 'Failed to fetch community feed' });
  }
};

module.exports = {
  getFeedEvents
};
