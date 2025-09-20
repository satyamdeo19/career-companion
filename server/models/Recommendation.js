const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    // Link the recommendation to a specific user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The career path predicted by the AI model
    prediction: {
      type: String,
      required: true,
    },
    // The probability score from the model
    probability: {
      type: Number,
      required: true,
    },
    // Store the user's answers for future reference or analysis
    answers: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Recommendation', recommendationSchema);
