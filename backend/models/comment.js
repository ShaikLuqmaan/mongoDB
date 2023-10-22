const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commenterName: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  blogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPosts',
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
