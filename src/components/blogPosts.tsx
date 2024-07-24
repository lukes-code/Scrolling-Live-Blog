import { fetchBlogPosts } from "@/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import WebsocketService from "@/websockets/websocketService";
import {
  addPost,
  removePost,
  setPosts,
  updatePost,
  increasePostsToShow,
  addPostToStart,
} from "@/store/slices/blogSlice";
import { BlogPost } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./button";
import Link from "next/link";
import {
  selectAllPosts,
  selectPostsToShow,
  selectTotalPosts,
} from "@/selectors/blogSelector";

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
      // Add toast notification here
      console.error("Failed to fetch posts:", error);
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

    const newPost: BlogPost = {
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

  // Removes post from state
  const handleRemovePost = (id: number) => {
    dispatch(removePost(id));
  };

  // Update post in state to new updated dummy title, could use this to track likes/favourites
  const handleUpdatePost = (post: BlogPost) => {
    dispatch(updatePost(post));
  };

  // Connect to websocket and disptach new post to start of list when received
  useEffect(() => {
    WebsocketService.connect("ws://localhost:8080");

    WebsocketService.onMessage((post: BlogPost) => {
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
        {posts.slice(0, postsToShow).map((post) => (
          <div
            key={post?.id}
            className="flex flex-col border p-10 pb-5 w-full max-w-[650px] gap-y-2"
          >
            <div className="flex items-center gap-x-4">
              <Image
                src={post?.author?.avatar}
                alt={post?.title}
                width={50}
                height={50}
                className="rounded-full max-w-[50px] max-h-[50px]"
              />
              <h3>{post?.author?.name}</h3>
            </div>
            <div className="flex flex-col gap-y-2 mt-2">
              <h2 className="underline text-xl">
                <Link href={`/blog/${post?.id}`}>{post?.title}</Link>
              </h2>
              {/* Truncate the body after 2 lines */}
              <p className="line-clamp-2 text-gray-600">{post?.body}</p>
              <div className="flex pt-5 items-center justify-between">
                <div className="flex gap-x-2">
                  <Button handleClick={() => handleRemovePost(post?.id)}>
                    Remove
                  </Button>
                  <Button
                    handleClick={() =>
                      handleUpdatePost({ ...post, title: "Updated Title" })
                    }
                  >
                    Update
                  </Button>
                </div>
                <Link href={`/blog/${post?.id}`}>Read More &rarr;</Link>
              </div>
            </div>
          </div>
        ))}
        {loading && <p>Loading...</p>}
        <p>No more posts :(</p>
      </section>
    </>
  );
};

export default BlogPosts;
