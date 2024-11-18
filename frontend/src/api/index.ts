import { toast } from "react-toastify";

export const fetchBlogPosts = async () => {
  try {
    const response = await fetch("http://localhost:5000/blog_posts");

    if (!response.ok) {
      toast.error(`Failed to fetch posts ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Failed to fetch posts");
  }
};
