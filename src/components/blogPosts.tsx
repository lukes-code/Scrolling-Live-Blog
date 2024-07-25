import { fetchBlogPosts } from "@/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import WebsocketService from "@/websockets/websocketService";
import {
  setPosts,
  increasePostsToShow,
  addPostToStart,
} from "@/store/slices/blogSlice";
import { BlogPost as BlogPostType } from "@/types";
import { useEffect, useState } from "react";
import {
  selectAllPosts,
  selectPostsToShow,
  selectTotalPosts,
} from "@/selectors/blogSelector";
import BlogPost from "./blogPost";
import { toast } from "react-toastify";

const BlogPosts = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectAllPosts);
  const postsToShow = useAppSelector(selectPostsToShow);
  const totalPosts = useAppSelector(selectTotalPosts);

  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchBlogPosts();
      dispatch(setPosts({ posts: data.posts, totalPosts: data.totalPosts }));
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Load posts on initial render or when we increase the amount to show
  useEffect(() => {
    loadPosts();
  }, [postsToShow]);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + viewportHeight >= scrollHeight - 100) {
      // 100px from bottom increate number of posts to show
      if (!loading && postsToShow < totalPosts) {
        dispatch(increasePostsToShow());
      }
    }
  };

  // Add scroll event listener to track scroll position
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, posts, totalPosts]);

  // Dummy add new hardcoded post,
  const handleAddPost = () => {
    const gender = Math.random() < 0.5 ? "men" : "women";
    const id = posts.length + 1;

    const newPost: BlogPostType = {
      id: id,
      title: "New Post",
      body: "This is a new post",
      author: {
        name: "John Doe",
        avatar: `https://randomuser.me/api/portraits/${gender}/${id}.jpg`,
      },
      userId: 1,
    };
    dispatch(addPostToStart(newPost));
  };

  // Connect to websocket and disptach new post to start of list when received
  useEffect(() => {
    WebsocketService.connect("ws://localhost:8080");

    WebsocketService.onMessage((post: BlogPostType) => {
      toast.success("New post added!");
      dispatch(addPostToStart(post));
    });

    return () => {
      WebsocketService.disconnect();
    };
  }, [dispatch]);

  return (
    <>
      <h1>Blog Posts</h1>
      <button onClick={handleAddPost}>Add Post</button>
      <section className="flex flex-col mx-5 gap-y-3 justify-center items-center">
        {/* Need to make this a blog post component */}
        {posts.slice(0, postsToShow).map((post, index) => (
          <BlogPost post={post} key={index} />
        ))}
        {loading && <p>Loading...</p>}
        <p className="py-10">No more posts :(</p>
      </section>
    </>
  );
};

export default BlogPosts;
