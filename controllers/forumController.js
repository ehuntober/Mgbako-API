// controllers/forumController.js
const forumService = require('../services/forumService');

exports.getAllForums = async (req, res) => {
  try {
    const forums = await forumService.getAllForums();
    res.json(forums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createForum = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdBy = req.user.id;
    const forum = await forumService.createForum(title, description, createdBy);
    res.status(201).json(forum);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Implement the rest of the forum controller functions