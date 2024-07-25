import { fetchBlogPosts } from "@/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import WebsocketService from "@/websockets/websocketService";
import {
  setPosts,
  increasePostsToShow,
  addPostToStart,
  setNewestId,
} from "@/store/slices/blogSlice";
import { BlogPost as BlogPostType, ButtonType } from "@/types";
import { useEffect, useState } from "react";
import {
  selectAllPosts,
  selectPostsToShow,
  selectTotalPosts,
} from "@/selectors/blogSelector";
import BlogPost from "../BlogPost/blogPost";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import Button from "../button";
import BlogHeading from "../blogHeading";

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
      <section className="flex flex-col mx-5 gap-y-3 justify-center items-center">
        <BlogHeading>
          ALL
          <br />
          POS-
          <br />
          TS.
        </BlogHeading>
        <p className="p-3 pb-10 max-w-[500px]">
          From Counter Strike to League of Legends, Natus Vincere to FaZe Clan,
          you'll find the most up to date news here.
        </p>
        {loading ? (
          <Skeleton
            count={5}
            containerClassName="w-full flex flex-col max-w-[650px] gap-y-2"
            className="h-[250px]"
          />
        ) : (
          <>
            {posts.slice(0, postsToShow).map((post, index) => (
              <BlogPost post={post} key={index} />
            ))}
            <p className="py-10">No more posts :(</p>
          </>
        )}
      </section>
      {showScrollToTop && <Button buttonType={ButtonType.ScrollToTop} />}
    </>
  );
};

export default BlogPosts;
