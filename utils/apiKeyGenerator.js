// // utils/apiKeyGenerator.js
// const jwt = require('jsonwebtoken');

// const generateAPIKey = (userId) => {
//   const secret = 'your_secret_key';
//   const payload = { userId };
//   const options = { expiresIn: '7d' };
//   return jwt.sign(payload, secret, options);
// };

// module.exports = {
//   generateAPIKey,
// };


// utils/apiKeyGenerator.js
const crypto = require('crypto');

const generateAPIKey = (userId) => {
  const apiKey = crypto.randomBytes(20).toString('hex');
  return apiKey;
};

module.exports = {
  generateAPIKey
};