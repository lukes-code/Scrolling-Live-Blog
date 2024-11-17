// testDbConnection.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Define the BlogPost model (same as in your main app)
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

// Connect to MongoDB using the same DATABASE_URL from your .env
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    // Find all blog posts in the collection
    return BlogPost.find();
  })
  .then((blogPosts) => {
    console.log("Blog Posts:", blogPosts); // This will log all blog posts from the collection
    mongoose.connection.close(); // Close the connection after fetching data
  })
  .catch((err) => {
    console.error("Error:", err.message);
    mongoose.connection.close(); // Close the connection on error
  });
