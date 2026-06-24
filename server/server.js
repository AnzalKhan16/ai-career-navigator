require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const activityRoutes = require('./routes/activityRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/resumes', resumeRoutes);

// Base Route for Health Check
app.get('/', (req, res) => {
  res.send('AI Career Navigator Backend V2 Running');
});

// MongoDB Connection & Server Start
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_career_navigator')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
