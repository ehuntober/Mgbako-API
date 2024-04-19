// routes/forumRoutes.js
const express = require('express');
const forumController = require('../controllers/forumController');
const { verifyAPIKey, verifyToken, authorizeRole } = require('../utils/middleware');

const router = express.Router();

router.get('/', forumController.getAllForums);
router.get('/:id',forumController.getForum)
router.post('/', verifyAPIKey, verifyToken, authorizeRole('moderator'), forumController.createForum);
router.put('/:id', verifyAPIKey, verifyToken, authorizeRole('moderator'), forumController.updateForum);
router.delete('/:id', verifyAPIKey, verifyToken, authorizeRole('moderator'), forumController.deleteForum);

module.exports = router;