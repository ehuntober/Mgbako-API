// controlers/userController

exports.updateAvatar = async (req, res) => {
    try {
      const userId = req.user.id;
      const avatarPath = req.file.path;
      await userService.updateAvatar(userId, avatarPath);
      res.json({ message: 'Avatar updated' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };