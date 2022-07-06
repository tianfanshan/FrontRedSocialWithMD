import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comment: {},
  comments: [],
  createCommentMessage: "",
  commentIsSuccess: false,
  commentIsError: false,
};

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (comment, thunkAPI) => {
    try {
      return await commentsService.createComment(comment);
    } catch (error) {
      const createCommentMessage = error.response.data.massage;
      return thunkAPI.rejectWithValue(createCommentMessage);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentIsSuccess = true;
        state.comment = action.payload.comment;
        state.createCommentMessage = action.payload.massage;
        state.comments = [...state.comments, state.comment];
      })
      .addCase(createComment.rejected, (state, action) => {
        state.commentIsError = true;
        state.createCommentMessage = action.payload;
      });
  },
});

export const { resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;
