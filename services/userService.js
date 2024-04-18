// // services/userService.js
// exports.updateAvatar = async (userId, avatarPath) => {
//     const user = await User.findById(userId);
//     user.avatar = avatarPath;
//     await user.save();
//   };


// services/userService.js
const User = require('../models/User');

exports.updateAvatar = async (userId, avatarPath) => {
  const user = await User.findById(userId);
  user.avatar = avatarPath;
  await user.save();
};

exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId, '-password');
  return user;
};

exports.updateUserProfile = async (userId, updates) => {
  const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
  return user;
};

exports.deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};
