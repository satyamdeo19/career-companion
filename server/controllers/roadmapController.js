const axios = require('axios');
const Recommendation = require('../models/Recommendation'); // Import the new model we created

/**
 * @desc    Generate a career recommendation, save it, and return it.
 * @route   POST /api/roadmap/generate
 * @access  Private (A user must be logged in to access this)
 */
const generateRecommendation = async (req, res) => {
  try {
    // 1. Get the user's quiz answers from the frontend request.
    const userAnswers = req.body;
    
    // 2. Make a secure, server-to-server request to your Python AI service.
    const aiServiceResponse = await axios.post(
      'http://localhost:8000/predict', // The URL where your Python/Flask service is running
      userAnswers
    );

    // Extract the prediction and probability from the AI service's response.
    const { prediction, probability } = aiServiceResponse.data;

    // 3. Save the result to your MongoDB database.
    // The `req.user.id` is automatically added to the request by your `protect` middleware,
    // linking this recommendation to the currently logged-in user.
    const newRecommendation = await Recommendation.create({
      user: req.user.id,
      prediction,
      probability,
      answers: userAnswers, // It's good practice to store the answers that led to the prediction.
    });

    // 4. Send the newly created and saved recommendation back to the frontend.
    res.status(201).json(newRecommendation);

  } catch (error) {
    // This block catches any errors during the process, such as if the Python service is down.
    console.error('Error in recommendation generation process:', error.message);
    
    // Check if the error came from the AI service to provide a more specific message.
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.error : 'A server error occurred while generating the recommendation.';
    
    res.status(status).json({ message });
  }
};

// Export the function to be used in your roadmapRoutes.js file.
module.exports = {
  generateRecommendation,
};

