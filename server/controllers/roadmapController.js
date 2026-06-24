const Roadmap = require('../models/Roadmap');
const { generateCareerRoadmap } = require('../services/openaiService');

// @desc    Generate and save a new AI career roadmap
// @route   POST /api/roadmaps
// @access  Private
const createRoadmap = async (req, res) => {
  try {
    const { currentRole, targetRole } = req.body;

    if (!currentRole || !targetRole) {
      return res.status(400).json({ message: 'Please provide both current and target roles' });
    }

    // Call OpenAI Service
    const roadmapContent = await generateCareerRoadmap(currentRole, targetRole);

    // Save to Database
    const roadmap = await Roadmap.create({
      user: req.user._id, // Available via the protect middleware
      currentRole,
      targetRole,
      roadmapContent,
    });

    // Log the Activity
    const Activity = require('../models/Activity');
    await Activity.create({
      user: req.user._id,
      targetRole,
      action: 'Generated Career Roadmap',
    });

    // Broadcast to Community Feed
    const FeedEvent = require('../models/FeedEvent');
    await FeedEvent.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: currentRole, // their current role
      eventType: 'roadmap_created',
      actionText: 'generated a roadmap to become',
      target: targetRole,
    });

    res.status(201).json(roadmap);
  } catch (error) {
    console.error('Roadmap Generation Error:', error.message);
    res.status(500).json({ message: 'Failed to generate roadmap' });
  }
};

// @desc    Get all roadmaps for the logged-in user
// @route   GET /api/roadmaps
// @access  Private
const getUserRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (error) {
    console.error('Fetch Roadmaps Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch roadmaps' });
  }
};

module.exports = {
  createRoadmap,
  getUserRoadmaps,
};
