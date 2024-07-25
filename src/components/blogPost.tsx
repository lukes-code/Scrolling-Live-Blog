import { BlogPost as BlogPostType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { useAppDispatch } from "@/store/hooks";
import { removePost, updatePost } from "@/store/slices/blogSlice";
import AuthorDetails from "./authorDetails";

const BlogPost = (props: { post: BlogPostType }) => {
  const { post } = props;

  const dispatch = useAppDispatch();

  // Removes post from state
  const handleRemovePost = (id: number) => {
    dispatch(removePost(id));
  };

  // Update post in state to new updated dummy title, could use this to track likes/favourites
  const handleUpdatePost = (post: BlogPostType) => {
    dispatch(updatePost(post));
  };

  return (
    <div
      key={post?.id}
      className="flex flex-col border p-10 pb-5 w-full max-w-[650px] gap-y-2"
    >
      <AuthorDetails author={post?.author} title={post?.title} />
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
  );
};

export default BlogPost;
