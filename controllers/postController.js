// controllers/postController.js
const postService = require('../services/postService');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const createdBy = req.user.id;
    const { forumId } = req.params;
    const post = await postService.createPost(title, content, createdBy, forumId);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.approvePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.approvePost(id);
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.banUser = async (req, res) => {
  try {
    const { userId } = req.body;
    await postService.banUser(userId);
    res.json({ message: 'User banned' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};