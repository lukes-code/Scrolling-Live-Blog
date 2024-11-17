
import { combineReducers } from '@reduxjs/toolkit';
import blogReducer from '../slices/blogSlice';

const rootReducer = combineReducers({
  blog: blogReducer,
});

export default rootReducer;
