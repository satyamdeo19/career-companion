const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// ========== LOCAL AUTHENTICATION ROUTES (Original) ==========

// POST /api/auth/register - Register with email/password
router.post('/register', authController.register);

// POST /api/auth/login - Login with email/password
router.post('/login', authController.login);

// ========== GOOGLE OAUTH ROUTES ==========

// POST /api/auth/google - Handle Google OAuth authentication
// Frontend should send: { googleId, name, email, avatar }
router.post('/google', authController.googleAuth);

// ========== GITHUB OAUTH ROUTES ==========

// POST /api/auth/github - Handle GitHub OAuth authentication  
// Frontend should send: { githubId, name, email, avatar }
router.post('/github', authController.githubAuth);

// ========== PROTECTED ROUTES (for all auth types) ==========

// GET /api/auth/me - Get current user profile
router.get('/me', protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    provider: req.user.provider,
    avatar: req.user.avatar,
    createdAt: req.user.createdAt,
  });
});

// ========== OPTIONAL: SERVER-SIDE OAUTH ROUTES (if you want to handle OAuth server-side) ==========

/*
// If you want to implement server-side OAuth flow, uncomment and configure these:

const passport = require('passport');

// GET /api/auth/google/login - Redirect to Google OAuth
router.get('/google/login', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

// GET /api/auth/google/callback - Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

// GET /api/auth/github/login - Redirect to GitHub OAuth
router.get('/github/login', passport.authenticate('github', { 
  scope: ['user:email'] 
}));

// GET /api/auth/github/callback - GitHub OAuth callback
router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);
*/

module.exports = router;