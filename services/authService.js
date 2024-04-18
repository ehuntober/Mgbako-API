// services/authService.js
const User = require('../models/User');

exports.register = async (username, password) => {
  const user = await User.create({ username, password });
  return { user, apiKey: user.apiKey };
};

exports.login = async (username, password) => {
  const user = await User.findByCredentials(username, password);
  return { user, apiKey: user.apiKey };
};

exports.findUserById = async (userId) => {
  return await User.findById(userId);
};

exports.verifyAPIKey = async (apiKey) => {
  const user = await User.findOne({ apiKey });
  if (!user) {
    throw new Error('Invalid API key');
  }
  return user;
};

exports.authorizeUser = async (userId, requiredRole) => {
  const user = await exports.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (user.role !== requiredRole) {
    throw new Error('Unauthorized');
  }
  return user;
};