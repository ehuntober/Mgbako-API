// // routes/postRoutes.js
// const express = require('express');
// const postController = require('../controllers/postController');

// const router = express.Router();

// router.get('/forum/:forumId', postController.getPostsByForum);
// router.post('/forum/:forumId', postController.createPost);
// router.put('/:id', postController.updatePost);
// router.delete('/:id', postController.deletePost);

// module.exports = router;


//routes/postRoutes.js

const express = require('express');
const postController = require('../controllers/postController');
const { verifyAPIKey, verifyToken ,  authorizeRole } = require('../utils/middleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

router.get('/', verifyAPIKey, (req, res) => postController.getAllPosts(req, res));
router.post('/', verifyAPIKey, verifyToken, postController.createPost);
router.put('/:id', verifyAPIKey, verifyToken, postController.updatePost);
router.delete('/:id', verifyAPIKey, verifyToken, postController.deletePost);
router.post('/:postId/attachments', verifyAPIKey, verifyToken, upload.array('attachments'), postController.addAttachments);


router.put('/approve/:postId/:forumId', verifyAPIKey, verifyToken, authorizeRole('moderator'), postController.approvePost);

module.exports = router;