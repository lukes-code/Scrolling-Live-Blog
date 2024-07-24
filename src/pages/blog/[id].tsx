import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { selectPostById } from "@/selectors/blogSelector";
import Image from "next/image";

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

  if (!post) {
    // Add skeleton load here maybe
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-10 w-full text-center gap-y-10 justify-center items-center">
      <h2 className="underline text-xl">{post?.title}</h2>
      <p className="max-w-[800px] text-left">{post?.body}</p>
      <div className="flex gap-x-4 items-center">
        <Image
          src={post?.author?.avatar}
          alt={post?.title}
          width={50}
          height={50}
          className="rounded-full max-w-[50px] max-h-[50px]"
        />
        <h3>{post?.author?.name}</h3>
      </div>
    </div>
  );
};

export default BlogPost;
