const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const Activity = require('../models/Activity');
const Roadmap = require('../models/Roadmap');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/upload
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { targetRole, userName, userId } = req.body;

    // Forward file to Python FastAPI service
    const form = new FormData();
    form.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    
    if (targetRole) {
      form.append('targetRole', targetRole);
    }

    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000/api/analyze-resume';
    
    const response = await axios.post(pythonServiceUrl, form, {
      headers: {
        ...form.getHeaders()
      }
    });

    const aiData = response.data;

    // Save Roadmap to MongoDB
    const newRoadmap = new Roadmap({
      userId: userId || null,
      role: targetRole || aiData.role || 'Unknown Role',
      readinessScore: aiData.readinessScore || 0,
      currentSkills: aiData.currentSkills || [],
      missingSkills: aiData.missingSkills || [],
      weeks: aiData.weeks || []
    });

    const savedRoadmap = await newRoadmap.save();

    // Log Activity
    const newActivity = new Activity({
      userName: userName || 'Anonymous',
      targetRole: targetRole || aiData.role || 'Unknown Role',
      action: 'Generated a new career roadmap'
    });
    await newActivity.save();

    res.status(200).json({
      message: 'Resume analyzed successfully',
      roadmap: savedRoadmap,
      activity: newActivity
    });
  } catch (error) {
    console.error('Error in /api/upload:', error.message);
    res.status(500).json({ error: 'Failed to process resume' });
  }
});

// GET /api/community
router.get('/community', async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error in /api/community:', error.message);
    res.status(500).json({ error: 'Failed to fetch community activities' });
  }
});

module.exports = router;
