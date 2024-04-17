// services/postService.js
const Post = require('../models/Post');

exports.getPostsByForum = async (forumId) => {
  return await Post.find({ forumId });
};

exports.createPost = async (title, content, createdBy, forumId) => {
  const post = await Post.create({ title, content, createdBy, forumId, approved: false });
  return post;
};

exports.approvePost = async (postId) => {
  const post = await Post.findById(postId);
  post.approved = true;
  await post.save();
  return post;
};

exports.deletePost = async (postId) => {
  await Post.findByIdAndDelete(postId);
};

exports.banUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { role: 'banned' });
};