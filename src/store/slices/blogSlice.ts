import { BlogPost, BlogState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BlogState = {
  posts: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // Example reducers for now to test initial setup
    addPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action: PayloadAction<BlogPost>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    setPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { addPost, removePost, updatePost, setPosts } = blogSlice.actions;
export default blogSlice.reducer;
