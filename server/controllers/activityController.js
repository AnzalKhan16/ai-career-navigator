const Activity = require('../models/Activity');

// @desc    Log a new user activity
// @route   POST /api/activities
// @access  Private
const logActivity = async (req, res) => {
  try {
    const { targetRole, action } = req.body;

    if (!targetRole || !action) {
      return res.status(400).json({ message: 'Please provide targetRole and action' });
    }

    const activity = await Activity.create({
      user: req.user._id,
      targetRole,
      action
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error('Log Activity Error:', error.message);
    res.status(500).json({ message: 'Failed to log activity' });
  }
};

// @desc    Get user activities
// @route   GET /api/activities
// @access  Private
const getUserActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    console.error('Fetch Activities Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch activities' });
  }
};

module.exports = {
  logActivity,
  getUserActivities,
};
