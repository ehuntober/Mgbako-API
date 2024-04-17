// routes/forumRoutes.js
const express = require('express');
const forumController = require('../controllers/forumController');
// routes/forumRoutes.js
const { verifyAPIKey, authorizeRole } = require('../utils/middleware');



const router = express.Router();

router.get('/', forumController.getAllForums);
// router.post('/', forumController.createForum);
router.post('/', verifyAPIKey, authorizeRole('user'), forumController.createForum);
router.put('/:id', forumController.updateForum);
router.delete('/:id', forumController.deleteForum);

module.exports = router;