const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

// name of the model
module.exports = mongoose.model('Post',postSchema);
