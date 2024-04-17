// controllers/authController.js
const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { user, apiKey } = await authService.register(username, password);
    res.status(201).json({ user, apiKey });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, apiKey } = await authService.login(username, password);
    res.json({ user, apiKey });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};