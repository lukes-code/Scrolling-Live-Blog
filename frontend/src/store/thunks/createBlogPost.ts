import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlogPost } from "../../types";

export const createPostAsync = createAsyncThunk(
  "blogPosts/createPost",
  async (newPost: BlogPost, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/blog_posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const createdPost = await response.json();

      // Add id from payload response to new post
      const submittedPost = {
        _id: createdPost.insertedId,
        title: newPost.title,
        body: newPost.body,
        author: {
          name: newPost.author.name,
          avatar: newPost.author.avatar,
        },
      };
      return submittedPost;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
