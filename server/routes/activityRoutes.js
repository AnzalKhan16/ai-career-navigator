const express = require('express');
const router = express.Router();
const { logActivity, getUserActivities } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/activities
// @desc    Log a new activity
// @access  Private
router.post('/', protect, logActivity);

// @route   GET /api/activities
// @desc    Get user activities
// @access  Private
router.get('/', protect, getUserActivities);

module.exports = router;
