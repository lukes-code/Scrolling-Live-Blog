const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// Export a function that receives the database instance
module.exports = (database) => {
  const collection = database.collection("blogPosts");

  // GET: All blog posts
  router.get("/", async (req, res) => {
    try {
      const posts = await collection.find({}).toArray();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // GET: Single blog post by ID
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await collection.findOne({ _id: new ObjectId(id) });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  // POST: Create a new blog post
  router.post("/", async (req, res) => {
    try {
      const newPost = req.body;
      const result = await collection.insertOne(newPost);

      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(400).json({ message: "Failed to create post" });
    }
  });

  // DELETE: Delete a blog post by ID
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  return router;
};
