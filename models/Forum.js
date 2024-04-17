// models/Forum.js
const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

forumSchema.methods.addPost = function(postId) {
  this.posts.push(postId);
  return this.save();
};

forumSchema.statics.getAll = function() {
  return this.find().populate('createdBy', 'username');
};

forumSchema.statics.getById = function(id) {
  return this.findById(id).populate('createdBy', 'username').populate('posts');
};

forumSchema.methods.update = function(updates) {
  this.title = updates.title || this.title;
  this.description = updates.description || this.description;
  this.updatedAt = new Date();
  return this.save();
};

forumSchema.methods.delete = function() {
  return this.remove();
};

module.exports = mongoose.model('Forum', forumSchema);