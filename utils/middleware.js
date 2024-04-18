// utils/middleware.js
const authService = require('../services/authService');

exports.verifyAPIKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  try {
    const user = await authService.verifyAPIKey(apiKey);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.user = await authService.verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

exports.authorizeRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      await authService.authorizeUser(req.user.id, requiredRole);
      next();
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  };
};