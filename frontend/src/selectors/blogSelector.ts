import { RootState } from "../store/store";

// Select all posts with fallback
export const selectAllPosts = (state: RootState) => state.blog.posts || [];

// Select a post by id with fallback
export const selectPostById = (state: RootState, postId: number) =>
  state.blog.posts?.find((post) => post?._id === postId) || null;

// Select total number of posts with fallback
export const selectTotalPosts = (state: RootState) =>
  state.blog.posts ? state.blog.posts.length : 0;

// Select number of posts to show with fallback
export const selectPostsToShow = (state: RootState) =>
  state.blog.postsToShow || 0;

// Id of newest post added with fallback
export const selectNewestPostId = (state: RootState) =>
  state.blog.newestId || null;
