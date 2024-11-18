import { useState } from "react";
import BlogPosts from "../components/BlogPosts/blogPosts";
import BlogHeading from "../components/blogHeading";
import CreatePostModal from "../components/createPostModal";
import Button from "../components/button";
import { ButtonType } from "../types";

export default function Home() {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  return (
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
      <BlogPosts />
      <Button
        buttonType={ButtonType.AddNew}
        handleClick={() => setIsCreatePostModalOpen(true)}
      />
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        setIsOpen={() => setIsCreatePostModalOpen(!isCreatePostModalOpen)}
      />
    </section>
  );
}
