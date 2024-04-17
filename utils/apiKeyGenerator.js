// utils/apiKeyGenerator.js
const jwt = require('jsonwebtoken');

const generateAPIKey = (userId) => {
  const secret = 'your_secret_key';
  const payload = { userId };
  const options = { expiresIn: '7d' };
  return jwt.sign(payload, secret, options);
};

module.exports = {
  generateAPIKey,
};