import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost } from "../../types";
import { deletePostAsync } from "../thunks/deleteBlogPost";
import { createPostAsync } from "../thunks/createBlogPost"; // Import the createPostAsync thunk
import { fetchPostAsync } from "../thunks/fetchBlogPost";

type BlogState = {
  posts: BlogPost[];
  postsToShow: number;
  totalPosts: number;
  newestId: string;
  currentPost: BlogPost | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: BlogState = {
  posts: [],
  postsToShow: 20,
  totalPosts: 0,
  newestId: "",
  currentPost: null,
  status: "idle",
  error: null,
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
    addPostToStart(state, action: PayloadAction<BlogPost>) {
      state.posts.unshift(action.payload);
    },
    increasePostsToShow(state) {
      state.postsToShow += 20;
    },
    setNewestId(state, action: PayloadAction<string>) {
      state.newestId = action.payload;
    },
    setCurrentPost(state, action: PayloadAction<BlogPost | null>) {
      state.currentPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Post
    builder
      .addCase(fetchPostAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPostAsync.fulfilled,
        (state, action: PayloadAction<BlogPost>) => {
          state.status = "succeeded";
          state.currentPost = action.payload;
        }
      )
      .addCase(fetchPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    // Delete Post
    builder
      .addCase(deletePostAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        deletePostAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.posts = state.posts.filter(
            (post) => post._id !== action.payload
          );
          state.totalPosts -= 1;
        }
      )
      .addCase(deletePostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    // Create Post
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createPostAsync.fulfilled,
        (state, action: PayloadAction<BlogPost>) => {
          state.status = "succeeded";
          state.posts.unshift(action.payload);
          state.newestId = action.payload._id;
          state.totalPosts += 1;
        }
      )
      .addCase(createPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  addPost,
  addPostToStart,
  increasePostsToShow,
  setPosts,
  setNewestId,
  setCurrentPost, // Export the action to set the current post
} = blogSlice.actions;

export default blogSlice.reducer;
