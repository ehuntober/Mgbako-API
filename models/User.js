// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateAPIKey } = require('../utils/apiKeyGenerator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  if (this.isNew) {
    this.apiKey = await generateAPIKey(this._id);
  }

  this.updatedAt = new Date();
  next();
});

userSchema.statics.findByCredentials = async function(username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);