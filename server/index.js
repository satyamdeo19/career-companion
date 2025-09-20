require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// --- 1. ROUTE FILE IMPORTS ---
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
// This is the line you add to import your new roadmap routes
const roadmapRoutes = require('./routes/roadmapRoutes');

const app = express();

// --- 2. MIDDLEWARES ---
app.use(cors());
app.use(express.json()); // Body parser for JSON requests

// --- 3. API ROUTES ---
// This section tells Express which router file to use for which URL path.
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
// This is the line you add to "activate" your roadmap routes
app.use('/api/roadmap', roadmapRoutes);


// A simple root route to check if the API is running
app.get('/', (req, res) => {
  res.send('Career Companion API is running successfully!');
});

const PORT = process.env.PORT || 5001;

// --- 4. CONNECT TO DATABASE AND START SERVER ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    console.log('✅ MongoDB connected...');
  })
  .catch(err => console.error('❌ Could not connect to MongoDB...', err));
