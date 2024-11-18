// Exported types live here, separate them out here if the app grows in size

export type BlogPost = {
  _id?: number;
  author: Author;
  title: string;
  body: string;
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
  AddNew = "addNew",
  Back = "back",
}
