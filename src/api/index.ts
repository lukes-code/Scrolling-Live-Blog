import axios from "axios";

export const fetchBlogPosts = async () => {
  try {
    // Custom api endpoint that returns dummy data
    const response = await axios.get(
      "https://dummyjson.com/c/6b89-902c-4db7-88a9"
    );
    return response.data;
  } catch (error) {
    // Need to add toast notification here
    throw new Error("Failed to fetch data");
  }
};
