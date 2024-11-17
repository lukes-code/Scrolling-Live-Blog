import { Author } from "../types";
import Image from "next/image";

const AuthorDetails = (props: { author: Author; title: string }) => {
  const { author, title } = props;

  return (
    <div className="flex items-center gap-x-4">
      <div className="rounded-full bg-gray-200">
        <Image
          src={author.avatar}
          alt={title}
          width={50}
          height={50}
          className="rounded-full max-w-[50px] max-h-[50px]"
          data-testid="author-avatar"
        />
      </div>
      <h3>{author.name}</h3>
    </div>
  );
};

export default AuthorDetails;
