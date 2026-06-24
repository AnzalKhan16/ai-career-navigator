const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// @route   POST /api/resumes/analyze
// @desc    Upload a resume file and analyze it via AI
// @access  Private
router.post('/analyze', protect, upload.single('resume'), analyzeResume);

module.exports = router;
