// app.js
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose =  require("mongoose");

const authRoutes = require("./routes/authRoutes");
const forumRoutes = require("./routes/forumRoutes");
const postRoutes = require("./routes/postRoutes");
const { verifyAPIKey } = require("./utils/middleware");
const {initializeRealtime} = require("./utils/realtime");


const app = express();
const port = process.env.PORT || 3000;


// connect to MongoDB
const dbConnect = () =>{
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")
    } catch(error){
        console.log('Database error')
    }
}

dbConnect()


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// Initialize real-time updates
initializeRealtime(app);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/forums', verifyAPIKey, forumRoutes);
app.use('/api/posts', verifyAPIKey, postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
