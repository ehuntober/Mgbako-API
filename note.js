// controllers/forumController.js
const forumService = require('../services/forumService');

exports.getAllForums = async (req, res) => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    const forums = await forumService.getAllForums(page, limit, sortBy, sortOrder);
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

exports.updateForum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedForum = await forumService.updateForum(id, title, description);
    res.json(updatedForum);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteForum = async (req, res) => {
  try {
    const { id } = req.params;
    await forumService.deleteForum(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};