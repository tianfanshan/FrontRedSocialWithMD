import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'

const initialState = {
    user:null
}

export const register = createAsyncThunk('auth/register',async (user) => {
    console.log(user)
})

export const authSlice = createSlice ({
    name:"auth",
    initialState,
    reducers:{}
})

export default authSlice.reducer;