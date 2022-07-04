import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
    comment:{},
    createCommentMessage:"",
    commentIsSuccess:false,
    commentIsError:false
}

export const createComment = createAsyncThunk("comments/createComment",async (comment,thunkAPI) => {
    try {
        return await commentsService.createComment(comment)
    } catch (error) {
        console.log(error)
        const createCommentMessage = error.response.data.massage
        console.log(createCommentMessage)
        return thunkAPI.rejectWithValue(createCommentMessage)
    }
})

export const commentsSlice = createSlice({
    name:"comments",
    initialState,
    reducers:{
        createCommentReset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.createCommentMessage = "";
          },
    },
    extraReducers:(builder) => {
        builder
            .addCase(createComment.fulfilled, (state,action)=>{
                console.log(action.payload)
                state.commentIsSuccess = true
                state.comment = action.payload.comment
                state.createCommentMessage = action.payload.massage
            })
            .addCase(createComment.rejected,(state,action)=>{
                state.commentIsError = true
                state.createCommentMessage = action.payload
            })
    }
})

export const { createCommentReset} = commentsSlice.actions;

export default commentsSlice.reducer