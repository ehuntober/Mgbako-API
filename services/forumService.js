exports.getAllForums = async (page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc') => {
    const skip = (page - 1) * limit;
    const forums = await Forum.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    return forums;
  };