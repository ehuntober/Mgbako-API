// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  forumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
  attachments: [{ type: String }],
});

postSchema.methods.update = function(updates) {
  this.title = updates.title || this.title;
  this.content = updates.content || this.content;
  this.updatedAt = new Date();
  return this.save();
};

postSchema.methods.delete = function() {
  return this.remove();
};

postSchema.statics.getByForum = function(forumId) {
  return this.find({ forumId }).populate('createdBy', 'username');
};

postSchema.statics.getById = function(id) {
  return this.findById(id).populate('createdBy', 'username');
};

module.exports = mongoose.model('Post', postSchema);