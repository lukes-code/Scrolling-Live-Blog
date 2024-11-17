import { RootState } from "../store/store";

// Select all posts
export const selectAllPosts = (state: RootState) => state.blog.posts;

// Select a post by id
export const selectPostById = (state: RootState, postId: number) =>
  state.blog.posts.find((post) => post?.id === postId);

// Select total number of posts
export const selectTotalPosts = (state: RootState) => state.blog.posts.length;

// Select number of posts to show
export const selectPostsToShow = (state: RootState) => state.blog.postsToShow;

// Id of newest post added
export const selectNewestPostId = (state: RootState) => state.blog.newestId;
