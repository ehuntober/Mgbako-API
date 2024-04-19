// services/forumService.js
const Forum = require('../models/Forum');

exports.getAllForums = async (page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') => {
  const forums = await Forum.find()
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return forums;
};

exports.createForum = async (title, description, createdBy) => {
  const forum = new Forum({
    title,
    description,
    createdBy,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  await forum.save();
  return forum;
};

exports.updateForum = async (id, title, description) => {
  const forum = await Forum.findByIdAndUpdate(
    id,
    { title, description, updatedAt: new Date() },
    { new: true }
  );
  return forum;
};

exports.deleteForum = async (id) => {
  await Forum.findByIdAndDelete(id);
};


exports.getForum = async (id) => {
  try {
    const forum = await Forum.findById(id);
    return forum;
  } catch (error) {
    throw new Error('Failed to fetch forum');
  }
};