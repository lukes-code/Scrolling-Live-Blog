import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostAsync = createAsyncThunk(
  "blogPosts/getPost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/blog_posts/${postId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get post");
      }
      return response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
