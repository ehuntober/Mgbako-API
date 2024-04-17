// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const forumRoutes = require('./routes/forumRoutes');
const postRoutes = require('./routes/postRoutes');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const { verifyAPIKey } = require('./utils/middleware');
const { initializeRealtime } = require('./utils/realtime');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database error', error);
  }
};
dbConnect();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Initialize real-time updates
initializeRealtime(app);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/forums', verifyAPIKey, forumRoutes);
app.use('/api/posts', verifyAPIKey, postRoutes);

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Add the upload middleware to the appropriate routes
app.post('/api/users/avatar', verifyAPIKey, upload.single('avatar'), userController.updateAvatar);
app.post('/api/posts/:postId/attachments', verifyAPIKey, upload.array('attachments'), postController.addAttachments);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});