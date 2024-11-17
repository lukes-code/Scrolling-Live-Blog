import { useEffect, useState } from "react";
import { fetchBlogPosts } from "../../api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import WebsocketService from "../../websockets/websocketService";
import {
  setPosts,
  increasePostsToShow,
  addPostToStart,
  setNewestId,
} from "../../store/slices/blogSlice";
import { BlogPost as BlogPostType, ButtonType } from "../../types";
import { AnimatePresence, motion } from "framer-motion";
import {
  selectAllPosts,
  selectPostsToShow,
  selectTotalPosts,
} from "../../selectors/blogSelector";
import BlogPost from "../BlogPost/blogPost";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import Button from "../button";

const BlogPosts = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectAllPosts);
  const postsToShow = useAppSelector(selectPostsToShow);
  const totalPosts = useAppSelector(selectTotalPosts);

  const [loading, setLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const loadPosts = async () => {
    try {
      const data = await fetchBlogPosts();
      dispatch(setPosts({ posts: data.posts, totalPosts: data.totalPosts }));
    } catch (error) {
      toast.error("Failed to fetch posts");
    }
  };

  // Hide loading skeleton when we have posts
  useEffect(() => {
    if (totalPosts > 0) {
      setLoading(false);
    }
  }, [totalPosts]);

  // Load posts on initial render or when we increase the amount to show
  useEffect(() => {
    if (totalPosts === 0) loadPosts();
  }, [postsToShow, totalPosts]);

  // Add scroll event listener to track scroll position
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, posts, totalPosts]);

  // Connect to websocket and disptach new post to start of list when received
  useEffect(() => {
    WebsocketService.connect("ws://localhost:8080");

    WebsocketService.onMessage((post: BlogPostType) => {
      toast.success("New post added!");
      dispatch(setNewestId(post.id));
      dispatch(addPostToStart(post));
    });

    return () => {
      WebsocketService.disconnect();
    };
  }, [dispatch]);

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

    // Show or hide the scroll-to-top button based on scroll position
    setShowScrollToTop(scrollTop > 100);
  };

  return (
    <>
      {loading ? (
        <Skeleton
          count={5}
          containerClassName="w-full flex flex-col max-w-[650px] gap-y-2"
          className="h-[250px]"
        />
      ) : (
        <AnimatePresence>
          {posts.slice(0, postsToShow).map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <BlogPost post={post} />
            </motion.div>
          ))}
          <p className="py-10">No more posts :(</p>
        </AnimatePresence>
      )}
      {showScrollToTop && <Button buttonType={ButtonType.ScrollToTop} />}
    </>
  );
};

export default BlogPosts;
