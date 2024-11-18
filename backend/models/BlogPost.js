const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
  },
});

module.exports = mongoose.model("blogPosts", BlogPostSchema);
