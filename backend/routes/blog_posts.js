const express = require("express");
const BlogPost = require("../models/BlogPost");
const router = express.Router();

// GET: All blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// GET: Single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

// POST: Create a new blog post
router.post("/", async (req, res) => {
  try {
    // Create a new blog post instance
    const newPost = new BlogPost(req.body);
    // Save to database
    const savedPost = await newPost.save();
    // Return the saved post
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: "Failed to create post" });
  }
});

// DELETE: Delete a blog post by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

module.exports = router;
