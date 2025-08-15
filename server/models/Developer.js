const mongoose = require('mongoose');

const DeveloperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  domain: {
    type: String,
  },
  techstack: [{
    type: String,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Developer', DeveloperSchema);