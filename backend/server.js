const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri);

async function startServer() {
  try {
    await client.connect();
    const database = client.db("blog_posts");

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    const blogPostsRouter = require("./routes/blog_posts")(database);
    app.use("/blog_posts", blogPostsRouter);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

startServer();
