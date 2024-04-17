// routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/forum/:forumId', postController.getPostsByForum);
router.post('/forum/:forumId', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;