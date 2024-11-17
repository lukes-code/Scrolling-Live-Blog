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

export enum ButtonType {
  Primary = "primary",
  ScrollToTop = "scrollToTop",
  Back = "back",
}
