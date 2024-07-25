import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import BlogPosts from "./blogPosts";
import { fetchBlogPosts } from "@/api";
import { blogPostsData } from "./mockData";
import { store } from "@/store/store";

jest.mock("@/api");

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("BlogPosts Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display loading skeleton when data is being fetched", async () => {
    (fetchBlogPosts as jest.Mock).mockResolvedValue({
      posts: [],
      totalPosts: 0,
    });

    const { container } = render(
      <Provider store={store}>
        <BlogPosts />
      </Provider>
    );

    // Select by class name using querySelector
    const element = container.querySelector(".react-loading-skeleton");

    // Check if the element is in the document
    expect(element).toBeInTheDocument();
  });

  it("should display posts when data is fetched", async () => {
    (fetchBlogPosts as jest.Mock).mockResolvedValue(blogPostsData);

    await act(async () => {
      render(
        <Provider store={store}>
          <BlogPosts />
        </Provider>
      );
    });

    // Wait for the posts to be displayed from mock data
    await waitFor(() => {
      // Check that both blog posts are displayed
      expect(screen.getAllByTestId("blog-post")).toHaveLength(2);
    });

    // Some generic tests to check if the data is displayed from either post
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("Aerial Maneuvers in Rocket League")
      ).toBeInTheDocument();
    });
  });

  it("should display title and sub text when data is fetched", async () => {
    (fetchBlogPosts as jest.Mock).mockResolvedValue(blogPostsData);

    await act(async () => {
      render(
        <Provider store={store}>
          <BlogPosts />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("heading"));
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "From Counter Strike to League of Legends, Natus Vincere to FaZe Clan, you'll find the most up to date news here."
        )
      ).toBeInTheDocument();
    });
  });
});
