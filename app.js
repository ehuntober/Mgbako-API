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
const port =