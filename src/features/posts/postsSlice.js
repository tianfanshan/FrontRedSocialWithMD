import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  post: {},
  isLoading: false,
  addPostMessage: "",
  addPostIsSuccess: false,
  addPostIsError: false,
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

export const likesDown = createAsyncThunk("posts/likesDown", async (_id) => {
  try {
    return await postsService.likesDown(_id);
  } catch (error) {
    console.error(error);
  }
});

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  try {
    return await postsService.addPost(post);
  } catch (error) {
    console.error(error);
  }
});

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (_id) => {
    try {
      return await postsService.getPostById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
    addPostReset: (state) => {
      state.addPostIsSuccess = false;
      state.addPostMessage = "";
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
      .addCase(addPost.fulfilled, (state, action) => {
        state.addPostIsSuccess = true;
        state.posts = [...state.posts, action.payload.post];
        state.addPostMessage = action.payload.message;
      })
      .addCase(addPost.rejected, (state, action) => {
        console.log(action.payload);
      })
      // .addCase(addPost.rejected,(state,action)=>{
      //   console.log(action.payload)
      //   state.postMessage = action.payload.message
      // })
      .addCase(like.fulfilled, (state, action) => {
        const posts = state.posts.map((p) => {
          if (p._id === action.payload._id) {
            p = action.payload;
          }
          return p;
        });
      })
      .addCase(likesDown.fulfilled, (state, action) => {
        const posts = state.posts.map((p) => {
          if (p._id === action.payload._id) {
            p = action.payload;
          }
          return p;
        });
      });
  },
});

export const { reset, addPostReset } = postsSlice.actions;
export default postsSlice.reducer;
