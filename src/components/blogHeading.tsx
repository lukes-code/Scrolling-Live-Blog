type Props = {
  children: React.ReactNode;
};

const BlogHeading = (props: Props) => {
  const { children } = props;

  return (
    <h1
      className="p-10 pb-0 text-9xl font-bold justify-start text-left"
      data-testid="heading"
    >
      {children}
    </h1>
  );
};

export default BlogHeading;
