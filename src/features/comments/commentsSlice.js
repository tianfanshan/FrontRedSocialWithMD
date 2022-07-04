import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";
// import { useSelector } from 'react-redux/es/exports'

// const { post } = useSelector((state)=>state.post)

const initialState = {
    comment:[]
}

export const createComment = createAsyncThunk("comments/createComment",async (comment) => {
    try {
        return await commentsService.createComment(comment)
    } catch (error) {
        console.error(error)
    }
})

export const commentsSlice = createSlice({
    name:"comments",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(createComment.fulfilled, (state,action)=>{
                state.comment = action.payload.comment
            })
    }
})

export default commentsSlice.reducer