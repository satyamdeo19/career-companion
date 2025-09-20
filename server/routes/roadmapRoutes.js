const express = require('express');
const router = express.Router();
const { generateRecommendation } = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/roadmap/generate
// @desc    Generate a career recommendation for a logged-in user.
// @access  Private (This route is protected by the 'protect' middleware).
router.post('/generate', protect, generateRecommendation);

module.exports = router;

