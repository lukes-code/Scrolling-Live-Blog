import { useRouter } from "next/router";
import { useAppSelector } from "../../store/hooks";
import { selectPostById } from "../../selectors/blogSelector";
import Image from "next/image";
import AuthorDetails from "../../components/authorDetails";
import Button from "../../components/button";
import { ButtonType } from "../../types";
import BlogHeading from "../../components/blogHeading";
import Skeleton from "react-loading-skeleton";

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query;

  // Ensure id is a string
  const idAsNumber = Array.isArray(id)
    ? parseInt(id[0], 10)
    : typeof id === "string"
    ? parseInt(id, 10)
    : undefined;

  // Directly select the post by id
  const post = useAppSelector((state) =>
    idAsNumber !== undefined ? selectPostById(state, idAsNumber) : undefined
  );

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

      {post ? (
        <article className="flex flex-col justify-center items-center gap-y-10">
          <h2 className="text-2xl font-bold">{post?.title}</h2>
          <p className="max-w-[800px] text-left">{post?.body}</p>
          <AuthorDetails author={post?.author} title={post?.title} />
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
