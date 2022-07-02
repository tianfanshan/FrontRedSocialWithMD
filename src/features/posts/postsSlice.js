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

export const like = createAsyncThunk("posts/like", async (_id) => {
  try {
    return await postsService.like(_id);
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
    builder
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getAllPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(like.fulfilled, (state, action) => {
        const posts = state.posts.map((p) => {
          if (p._id === action.payload._id) {
            p = action.payload;
          }
          return p;
        });
      })
      // .addCase(likeDown.fulfilled, (state , action ) => {
        
      // })
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
