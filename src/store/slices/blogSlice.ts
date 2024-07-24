import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost } from "@/types";

type BlogState = {
  posts: BlogPost[];
  postsToShow: number;
  totalPosts: number;
};

const initialState: BlogState = {
  posts: [],
  postsToShow: 5, // Start with showing 5 posts
  totalPosts: 0,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setPosts(
      state,
      action: PayloadAction<{ posts: BlogPost[]; totalPosts: number }>
    ) {
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.totalPosts;
    },
    addPost(state, action: PayloadAction<BlogPost>) {
      state.posts.push(action.payload);
      state.totalPosts += 1;
    },
    removePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.totalPosts -= 1;
    },
    updatePost(state, action: PayloadAction<BlogPost>) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    addPostToStart(state, action: PayloadAction<BlogPost>) {
      state.posts.unshift(action.payload);
    },
    increasePostsToShow(state) {
      state.postsToShow += 20; // Show 5 more posts
    },
  },
});

export const {
  addPost,
  addPostToStart,
  increasePostsToShow,
  removePost,
  setPosts,
  updatePost,
} = blogSlice.actions;
export default blogSlice.reducer;
