// Exported types live here, separate them out here if the app grows in size

export type BlogPost = {
  id: number;
  author: Author;
  title: string;
  body: string;
  userId: number;
};

export type Author = {
  name: string;
  avatar: string;
};

export type BlogState = {
  posts: BlogPost[];
};

export type ButtonProps = {
  children: React.ReactNode;
  handleClick: () => void;
};
