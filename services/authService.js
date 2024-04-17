// services/authService.js
const User = require('../models/User');
const { generateAPIKey } = require('../utils/apiKeyGenerator');

exports.register = async (username, password) => {
  const user = await User.create({ username, password });
  const apiKey = generateAPIKey(user._id);
  return { user, apiKey };
};

exports.login = async (username, password) => {
  const user = await User.findByCredentials(username, password);
  const apiKey = generateAPIKey(user._id);
  return { user, apiKey };
};

exports.findUserById = async (userId) => {
  return await User.findById(userId);
};