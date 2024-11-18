import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPostById } from "../../selectors/blogSelector";
import Image from "next/image";
import AuthorDetails from "../../components/authorDetails";
import Button from "../../components/button";
import { ButtonType } from "../../types";
import BlogHeading from "../../components/blogHeading";
import Skeleton from "react-loading-skeleton";
import { fetchPostAsync } from "../../store/thunks/fetchBlogPost";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BlogPost = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = router.query;

  const [fetchedPost, setFetchedPost] = useState(null);

  const idString = typeof id !== "string" ? "" : id;

  // Directly select the post by id
  let post = useAppSelector((state) => selectPostById(state, idString));

  // Fetch the post if not found in the store
  useEffect(() => {
    if (!post && idString) {
      const fetchPost = async () => {
        const actionResult = await dispatch(fetchPostAsync(idString));
        if (fetchPostAsync.fulfilled.match(actionResult)) {
          setFetchedPost(actionResult.payload);
        } else {
          toast.error("Unable to fetch post");
        }
      };
      fetchPost();
    } else if (post) {
      setFetchedPost(post);
    }
  }, [dispatch, idString, post]);

  return (
    <div className="flex flex-col p-10 pt-0 w-full text-center gap-y-10 justify-center items-center">
      <BlogHeading>
        THE
        <br />
        PO-
        <br />
        ST.
      </BlogHeading>

      <Button buttonType={ButtonType.Back} />
      <Button buttonType={ButtonType.ScrollToTop} />

      {fetchedPost ? (
        <article className="flex flex-col justify-center items-center gap-y-10">
          <h2 className="text-2xl font-bold">{fetchedPost?.title}</h2>
          <p className="max-w-[800px] text-left">{fetchedPost?.body}</p>
          <AuthorDetails
            author={fetchedPost?.author}
            title={fetchedPost?.title}
          />
        </article>
      ) : (
        <Skeleton
          containerClassName="w-full flex flex-col max-w-[650px]"
          className="h-[250px]"
        />
      )}
    </div>
  );
};

export default BlogPost;
