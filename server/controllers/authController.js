const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Utility to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// ========== LOCAL AUTHENTICATION (Original email/password) ==========

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ 
      name, 
      email, 
      password,
      provider: 'local'
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      provider: user.provider,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPasswords(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// ========== GOOGLE OAUTH AUTHENTICATION ==========

exports.googleAuth = async (req, res) => {
  try {
    const { googleId, name, email, avatar } = req.body;

    // Check if user already exists with this Google ID
    let user = await User.findOne({ googleId });

    if (user) {
      // User exists, log them in
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    }

    // Check if user exists with same email but different provider
    user = await User.findOne({ email });
    if (user) {
      // Link Google account to existing user
      user.googleId = googleId;
      user.avatar = avatar || user.avatar;
      await user.save();

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    }

    // Create new user with Google auth
    user = await User.create({
      name,
      email,
      googleId,
      avatar,
      provider: 'google',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      provider: user.provider,
      avatar: user.avatar,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: 'Google Auth Error', error: error.message });
  }
};

// ========== GITHUB OAUTH AUTHENTICATION ==========

exports.githubAuth = async (req, res) => {
  try {
    const { githubId, name, email, avatar } = req.body;

    // Check if user already exists with this GitHub ID
    let user = await User.findOne({ githubId });

    if (user) {
      // User exists, log them in
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    }

    // Check if user exists with same email but different provider
    if (email) {
      user = await User.findOne({ email });
      if (user) {
        // Link GitHub account to existing user
        user.githubId = githubId;
        user.avatar = avatar || user.avatar;
        await user.save();

        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          provider: user.provider,
          avatar: user.avatar,
          token: generateToken(user._id),
        });
      }
    }

    // Create new user with GitHub auth
    user = await User.create({
      name,
      email: email || `github_${githubId}@noemail.com`, // GitHub might not provide email
      githubId,
      avatar,
      provider: 'github',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      provider: user.provider,
      avatar: user.avatar,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: 'GitHub Auth Error', error: error.message });
  }
};

// ========== OAUTH CALLBACK HANDLERS ==========

// Google OAuth callback (for server-side OAuth flow)
exports.googleCallback = async (profile) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      return user;
    }

    // Check for existing user with same email
    user = await User.findOne({ email: profile.emails[0].value });
    if (user) {
      user.googleId = profile.id;
      user.avatar = profile.photos[0].value;
      await user.save();
      return user;
    }

    // Create new user
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
      avatar: profile.photos[0].value,
      provider: 'google',
    });

    return user;
  } catch (error) {
    throw new Error(`Google OAuth Error: ${error.message}`);
  }
};

// GitHub OAuth callback (for server-side OAuth flow)
exports.githubCallback = async (profile) => {
  try {
    let user = await User.findOne({ githubId: profile.id });

    if (user) {
      return user;
    }

    // Check for existing user with same email (if available)
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    if (email) {
      user = await User.findOne({ email });
      if (user) {
        user.githubId = profile.id;
        user.avatar = profile.photos[0].value;
        await user.save();
        return user;
      }
    }

    // Create new user
    user = await User.create({
      name: profile.displayName || profile.username,
      email: email || `github_${profile.id}@noemail.com`,
      githubId: profile.id,
      avatar: profile.photos[0].value,
      provider: 'github',
    });

    return user;
  } catch (error) {
    throw new Error(`GitHub OAuth Error: ${error.message}`);
  }
};