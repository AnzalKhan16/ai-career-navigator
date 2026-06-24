const express = require('express');
const router = express.Router();
const { createRoadmap, getUserRoadmaps } = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/roadmaps
// @desc    Generate a new roadmap via AI
// @access  Private
router.post('/', protect, createRoadmap);

// @route   GET /api/roadmaps
// @desc    Get all roadmaps for the user
// @access  Private
router.get('/', protect, getUserRoadmaps);

module.exports = router;
