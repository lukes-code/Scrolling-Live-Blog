import BlogPosts from "@/components/BlogPosts/blogPosts";
import BlogHeading from "@/components/blogHeading";

export default function Home() {
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
    </section>
  );
}
