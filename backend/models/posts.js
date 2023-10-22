const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
