// routes/forumRoutes.js
const express = require('express');
const forumController = require('../controllers/forumController');

const router = express.Router();

router.get('/', forumController.getAllForums);
router.post('/', forumController.createForum);
router.put('/:id', forumController.updateForum);
router.delete('/:id', forumController.deleteForum);

module.exports = router;