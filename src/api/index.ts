import axios from "axios";
import { toast } from "react-toastify";

export const fetchBlogPosts = async () => {
  try {
    // Custom api endpoint that returns dummy data
    const response = await axios.get(
      "https://dummyjson.com/c/4c10-1f49-4977-870c"
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch posts");
  }
};
