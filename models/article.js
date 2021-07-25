const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  snippet: {
    type: String,
    required: true,
  },

  clicks: {
    type: Number,
    default: 0,
  },

  likes: {
    type: Number,
    default: 0,
  },
});

const article = mongoose.model('article', articleSchema);
module.exports = article;