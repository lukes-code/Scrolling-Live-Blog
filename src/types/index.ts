export type BlogPost = {
  id: number;
  title: string;
  content: string;
};

export type BlogState = {
  posts: BlogPost[];
};
