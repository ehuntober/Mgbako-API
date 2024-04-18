// // controllers/authController.js
// const authService = require('../services/authService');

// exports.register = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await authService.register(username, password);
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const { user, token, apiKey } = await authService.login(username, password);
//     res.json({ user, token, apiKey });
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//   }
// };

// controllers/authController.js
const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token, apiKey } = await authService.register(username, password);
    res.status(201).json({ user, token, apiKey });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token, apiKey } = await authService.login(username, password);
    res.json({ user, token, apiKey });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await authService.logout(req.user.id);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};