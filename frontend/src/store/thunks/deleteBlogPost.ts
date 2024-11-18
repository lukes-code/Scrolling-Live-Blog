import { createAsyncThunk } from "@reduxjs/toolkit";

export const deletePostAsync = createAsyncThunk(
  "blogPosts/deletePost",
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/blog_posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      return postId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
