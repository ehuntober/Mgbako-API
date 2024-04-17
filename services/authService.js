// services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// services/authService.js
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

exports.verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      return decoded.userId;
    } catch (err) {
      throw new Error('Invalid token');
    }
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