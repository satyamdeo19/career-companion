const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// ========== LOCAL AUTHENTICATION ROUTES ==========

// POST /api/auth/register - Register with email/password
router.post('/register', authController.register);

// POST /api/auth/login - Login with email/password
router.post('/login', authController.login);

// ========== GOOGLE OAUTH ROUTES (Client-Side Flow) ==========

// POST /api/auth/google - Handle Google OAuth authentication
// The frontend will send the user's profile info here.
router.post('/google', authController.googleAuth);

// ========== GITHUB OAUTH ROUTES (Client-Side Flow) ==========

// POST /api/auth/github - Handle GitHub OAuth authentication
// The frontend will send the user's profile info here.
router.post('/github', authController.githubAuth);

// ========== PROTECTED ROUTES ==========

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

/*
// The server-side OAuth routes below have been commented out
// because they conflict with the simpler client-side flow above
// and cause an error due to the missing generateToken function.

const passport = require('passport');

router.get('/google/login', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id); // This would cause an error
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

router.get('/github/login', passport.authenticate('github', {
  scope: ['user:email']
}));

router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id); // This would cause an error
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);
*/

module.exports = router;