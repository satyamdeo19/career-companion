const jwt = require('jsonwebtoken');
const User = require('../models/user');

// ========== JWT TOKEN PROTECTION MIDDLEWARE ==========
// This middleware works for all authentication types (local, Google, GitHub)

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach user to the request object, excluding the password
      req.user = await User.findById(decoded.id).select('-password');
      
      // Check if user still exists (in case user was deleted after token was issued)
      if (!req.user) {
        return res.status(401).json({ message: 'User no longer exists' });
      }
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// ========== OPTIONAL: PROVIDER-SPECIFIC MIDDLEWARE ==========

// Middleware to check if user is authenticated via local auth (email/password)
exports.requireLocal = async (req, res, next) => {
  if (req.user && req.user.provider === 'local') {
    next();
  } else {
    res.status(403).json({ 
      message: 'This action requires local authentication (email/password)' 
    });
  }
};

// Middleware to check if user is authenticated via Google OAuth
exports.requireGoogle = async (req, res, next) => {
  if (req.user && req.user.provider === 'google') {
    next();
  } else {
    res.status(403).json({ 
      message: 'This action requires Google authentication' 
    });
  }
};

// Middleware to check if user is authenticated via GitHub OAuth
exports.requireGitHub = async (req, res, next) => {
  if (req.user && req.user.provider === 'github') {
    next();
  } else {
    res.status(403).json({ 
      message: 'This action requires GitHub authentication' 
    });
  }
};

// Middleware to check if user has OAuth authentication (Google OR GitHub)
exports.requireOAuth = async (req, res, next) => {
  if (req.user && (req.user.provider === 'google' || req.user.provider === 'github')) {
    next();
  } else {
    res.status(403).json({ 
      message: 'This action requires OAuth authentication (Google or GitHub)' 
    });
  }
};