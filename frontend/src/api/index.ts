import { toast } from "react-toastify";

export const fetchBlogPosts = async () => {
  try {
    // Custom API endpoint that returns dummy data
    const response = await fetch("https://dummyjson.com/c/4c10-1f49-4977-870c");

    if (!response.ok) {
      toast.error(`Failed to fetch posts ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Failed to fetch posts");
  }
};
