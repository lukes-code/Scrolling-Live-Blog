import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost } from "../../types";

type BlogState = {
  posts: BlogPost[];
  postsToShow: number;
  totalPosts: number;
  newestId: number;
};

const initialState: BlogState = {
  posts: [],
  postsToShow: 20,
  totalPosts: 0,
  newestId: 0,
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
    addPostToStart(state, action: PayloadAction<BlogPost>) {
      state.posts.unshift(action.payload);
    },
    increasePostsToShow(state) {
      state.postsToShow += 20;
    },
    setNewestId(state, action: PayloadAction<number>) {
      state.newestId = action.payload;
    },
  },
});

export const {
  addPost,
  addPostToStart,
  increasePostsToShow,
  removePost,
  setPosts,
  setNewestId,
} = blogSlice.actions;
export default blogSlice.reducer;
