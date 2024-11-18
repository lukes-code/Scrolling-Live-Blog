import { BlogPost as BlogPostType } from "../../types";
import { classNames } from "../../helper";
import { motion } from "framer-motion";
import { setNewestId } from "../../store/slices/blogSlice";
import { selectNewestPostId } from "../../selectors/blogSelector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import AuthorDetails from "../authorDetails";
import Button from "../button";
import Link from "next/link";
import { deletePostAsync } from "../../store/thunks/deleteBlogPost";

const BlogPost = (props: { post: BlogPostType }) => {
  const { post } = props;

  const dispatch = useAppDispatch();
  const newestId = useAppSelector(selectNewestPostId);

  const [isNewestId, setIsNewestId] = useState(false);

  // Handle styling when post is the newest post
  useEffect(() => {
    if (newestId === post?._id) {
      setIsNewestId(true);
      const timer = setTimeout(() => {
        setIsNewestId(false);
        dispatch(setNewestId(0));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [newestId, post?._id, dispatch]);

  // Removes post from state
  const handleDelete = (id: number) => {
    dispatch(deletePostAsync(id));
  };

  return (
    <motion.article
      key={isNewestId ? `${post?._id}-newest` : post?._id} // Unique key to trigger animation
      className={classNames(
        isNewestId ? "border-[#c1e0f7]" : "border-gray-300",
        "flex flex-col border p-10 pb-5 w-full min-w-[350px] max-w-[650px] gap-y-2 transition-colors duration-300 relative"
      )}
      data-testid="blog-post"
      initial={{ x: isNewestId ? 600 : 0 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      {isNewestId && (
        <span className="absolute top-[-15px] right-0 bg-[#c1e0f7] text-xs m-1 py-1 px-2">
          New &#128640;
        </span>
      )}
      <AuthorDetails author={post?.author} title={post?.title} />
      <div className="flex flex-col gap-y-2 mt-2">
        <h2 className="underline text-xl">
          <Link href={`/blog/${post?._id}`}>{post?.title}</Link>
        </h2>
        {/* Truncate the body after 2 lines */}
        <p className="line-clamp-2 text-gray-600">{post?.body}</p>
        <div className="flex pt-5 items-center justify-between">
          <div className="flex gap-x-2">
            <Button handleClick={() => handleDelete(post?._id)}>Delete</Button>
          </div>
          <Link href={`/blog/${post?._id}`}>Read More &rarr;</Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPost;
