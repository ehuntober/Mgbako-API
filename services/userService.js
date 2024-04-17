// services/userService.js
exports.updateAvatar = async (userId, avatarPath) => {
    const user = await User.findById(userId);
    user.avatar = avatarPath;
    await user.save();
  };