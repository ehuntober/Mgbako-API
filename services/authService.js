// // services/authService.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { generateAPIKey } = require('../utils/apiKeyGenerator');

// const JWT_SECRET = 'your_secret_key';

// exports.register = async (username, password) => {
//   const user = await User.create({ username, password });
//   return user;
// };

// exports.login = async (username, password) => {
//   const user = await User.findByCredentials(username, password);
//   const token = generateJWT(user._id);
//   const apiKey = user.apiKey;
//   return { user, token, apiKey };
// };

// exports.findUserById = async (userId) => {
//   return await User.findById(userId);
// };

// exports.verifyToken = async (token) => {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await exports.findUserById(decoded.userId);
//     if (!user) {
//       throw new Error('Invalid token');
//     }
//     return user;
//   } catch (err) {
//     throw new Error('Invalid token');
//   }
// };

// exports.authorizeUser = async (userId, requiredRole) => {
//   const user = await exports.findUserById(userId);
//   if (!user) {
//     throw new Error('User not found');
//   }
//   if (user.role !== requiredRole) {
//     throw new Error('Unauthorized');
//   }
//   return user;
// };

// const generateJWT = (userId) => {
//   return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
// };



// services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAPIKey } = require('../utils/apiKeyGenerator');

const JWT_SECRET = 'your_secret_key';

exports.register = async (username, password) => {
  const user = await User.create({ username, password });
  const token = generateJWT(user._id);
  const apiKey = user.apiKey;
  return { user, token, apiKey };
};

exports.login = async (username, password) => {
  const user = await User.findByCredentials(username, password);
  const token = generateJWT(user._id);
  const apiKey = user.apiKey;
  return { user, token, apiKey };
};

exports.logout = async (userId) => {
  // Implement logout functionality, e.g., invalidate the JWT token
};

exports.findUserById = async (userId) => {
  return await User.findById(userId);
};

exports.verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await exports.findUserById(decoded.userId);
    if (!user) {
      throw new Error('Invalid token');
    }
    return user;
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

const generateJWT = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};