// services/postService.js
const Post = require('../models/Post');
const { emitPostCreated } = require('../utils/realtime');
const emailService = require('./emailService');

const sentimentService = require('./sentimentService');
const webhookService = require('./webhookService');



// post service
const Forum = require('../models/Forum'); // Import the Forum model

exports.approvePost = async (postId, forumId) => {
  console.log(postId, forumId);
  const post = await Post.findById(postId);
  console.log(post);
  if (!post) {
    throw new Error('Post not found');
  }

  // Update post properties
  post.approved = true;
  await post.save();

  // Send email notification to the post author
  const author = await User.findById(post.createdBy);
  await emailService.sendEmail(
    author.email,
    'Your post has been approved',
    `Your post "${post.title}" has been approved and is now visible on the forum.`
  );

  // Analyze sentiment of the post content
  const sentiment = await sentimentService.analyzeSentiment(post.content);
  post.sentiment = sentiment;
  await post.save();

  // Add the approved post to the forum
  const forum = await Forum.findById(forumId);
  if (forum) {
    forum.posts.push(post._id.toString()); // Convert post._id to string
    console.log(forum); // Log the updated forum document
    await forum.save();
  }

  return post;
};



exports.getPostsByForum = async (forumId) => {
  return await Post.find({ forumId });
};

// exports.createPost = async (title, content, createdBy, forumId) => {
//   const post = await Post.create({ title, content, createdBy, forumId, approved: false });
//   return post;
// };

exports.createPost = async (title, content, createdBy, forumId) => {
  try {
    const post = await Post.create({
      title,
      content,
      createdBy,
      forumId,
      approved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    emitPostCreated(post);
    await webhookService.sendWebhook('https://example.com/webhook', 'post_created', post);
    return post;
  } catch (err) {
    console.error('Error creating post:', err);
    throw err;
  }
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





exports.getPostsByForum = async (forumId, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') => {
    const skip = (page - 1) * limit;
    const posts = await Post.find({ forumId })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    return posts;
  };



  // services/postService.js
exports.addAttachments = async (postId, attachmentPaths) => {
    const post = await Post.findById(postId);
    post.attachments = [...post.attachments, ...attachmentPaths];
    await post.save();
  };