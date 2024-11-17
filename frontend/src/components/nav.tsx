import Link from "next/link";

const Nav = () => {
  return (
    <nav className="h-[100px] py-3 px-10 flex items-center border-b border-black mx-4">
      <Link href="/">
        <h1 className="text-4xl font-bold">GG</h1>
      </Link>
    </nav>
  );
};

export default Nav;
