// Exported types live here, separate them out here if the app grows in size

export type BlogPost = {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  body: string;
  userId: number;
};

export type BlogState = {
  posts: BlogPost[];
};

export type ButtonProps = {
  children: React.ReactNode;
  handleClick: () => void;
};
