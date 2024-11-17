import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

// Define a RootState type based on the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
