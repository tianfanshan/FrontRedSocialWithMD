import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comment: {},
  comments: [],
  createCommentMessage: "",
  commentIsSuccess: false,
  commentIsError: false,
  deleteCommentMessage:""
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

export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async (_id) => {
    try {
      return await commentsService.likeComment(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const commentLikeDown = createAsyncThunk(
  "comments/commentLikeDown",
  async (_id) => {
    try {
      return await commentsService.commentLikeDown(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async () => {
    try {
      return await commentsService.getAllComments();
    } catch (error) {
      console.error(error);
    }
  }
);

export const EditComment = createAsyncThunk(
  "comments/EditComment",
  async (comment) => {
    try {
      return await commentsService.EditComment(comment);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCommentById = createAsyncThunk(
  "comments/getCommentById",
  async (_id) => {
    try {
      return await commentsService.getCommentById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteCommentById = createAsyncThunk(
  "comments/deleteCommentById",
  async (_id) => {
    try {
      return await commentsService.deleteCommentById(_id);
    } catch (error) {
      console.error(error);
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
        state.createCommentMessage = action.payload.message;
        state.comments = [...state.comments, state.comment];
      })
      .addCase(createComment.rejected, (state, action) => {
        state.commentIsError = true;
        state.createCommentMessage = action.payload;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        const comments = state.comments.map((c) => {
          if (c._id === action.payload._id) {
            c = action.payload;
          }
          return c;
        });
        state.comments = comments;
      })
      .addCase(commentLikeDown.fulfilled, (state, action) => {
        const newLikes = action.payload.likes.filter(
          (id) => id !== action.payload._id
        );
        action.payload.likes = newLikes;
        const comments = state.comments.map((c) => {
          if (c._id === action.payload._id) {
            c = action.payload;
          }
          return c;
        });
        state.comments = comments;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(EditComment.fulfilled, (state, action) => {
        state.comment = action.payload;
        const comments = state.comments.map((c) => {
          if (c._id === state.comment._id) {
            c = state.comment;
          }
          return c;
        });
        state.comments = comments;
      })
      .addCase(getCommentById.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.deleteCommentMessage = action.payload.message
      });
  },
});

export const { resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;
