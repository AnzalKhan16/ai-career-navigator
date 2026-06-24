const express = require('express');
const router = express.Router();
const { getFeedEvents } = require('../controllers/communityController');

// GET /api/community
router.get('/', getFeedEvents);

module.exports = router;
