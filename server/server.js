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
const communityRoutes = require('./routes/communityRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/community', communityRoutes);

// Base Route for Health Check
app.get('/', (req, res) => {
  res.send('AI Career Navigator Backend V2 Running');
});

// MongoDB Connection & Server Start
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_career_navigator';
  try {
    // Try connecting to provided DB with a short timeout
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log('Connected to MongoDB');
    startServer();
  } catch (err) {
    console.log('Local/Remote MongoDB not found. Starting In-Memory MongoDB for instant development...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const inMemoryUri = mongoServer.getUri();
      await mongoose.connect(inMemoryUri);
      console.log('Connected to In-Memory MongoDB');
      startServer();
    } catch (memoryErr) {
      console.error('Failed to start In-Memory MongoDB', memoryErr);
    }
  }
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

connectDB();
