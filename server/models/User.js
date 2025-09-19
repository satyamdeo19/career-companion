const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: function() {
      // Password is only required if no OAuth providers are linked
      return !this.googleId && !this.githubId;
    },
    minlength: 6,
    select: false, // Prevents the password from being sent back in queries by default
  },
  // OAuth provider fields
  googleId: {
    type: String,
    sparse: true, // Allows null values while maintaining uniqueness for non-null values
  },
  githubId: {
    type: String,
    sparse: true,
  },
  avatar: {
    type: String, // Store profile picture URL from OAuth providers
  },
  provider: {
    type: String,
    enum: ['local', 'google', 'github'],
    default: 'local',
  },
}, { timestamps: true });

// Middleware to hash password before saving the user (only for local auth)
userSchema.pre('save', async function (next) {
  // Skip password hashing for OAuth users
  if (!this.password || !this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with the hashed password in the DB
userSchema.methods.matchPasswords = async function (password) {
  if (!this.password) {
    return false; // OAuth users don't have passwords
  }
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;