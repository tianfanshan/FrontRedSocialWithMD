import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
};

export const getAllPost = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    return await postsService.getAllPost();
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getAllPost.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
