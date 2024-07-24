import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addPost,
  removePost,
  updatePost,
  setPosts,
} from "../store/slices/blogSlice";
import { BlogPost } from "@/types";

// Setup with example usage for now for initial testing
export default function Home() {
  const posts = useAppSelector((state) => state.blog.posts);
  const dispatch = useAppDispatch();

  const handleAddPost = () => {
    const newPost: BlogPost = {
      id: posts.length + 1,
      title: "New Post",
      content: "This is a new post",
    };
    dispatch(addPost(newPost));
  };

  const handleRemovePost = (id: number) => {
    dispatch(removePost(id));
  };

  const handleUpdatePost = (post: BlogPost) => {
    dispatch(updatePost(post));
  };

  const handleSetPosts = (newPosts: BlogPost[]) => {
    dispatch(setPosts(newPosts));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <button onClick={handleAddPost}>Add Post</button>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleRemovePost(post.id)}>Remove</button>
            <button
              onClick={() =>
                handleUpdatePost({ ...post, title: "Updated Title" })
              }
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
