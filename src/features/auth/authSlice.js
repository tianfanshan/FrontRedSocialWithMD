import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
    user:null
}

export const register = createAsyncThunk('auth/register',async (user) => {
    console.log(user)
    try {
        return await authService.register(user)
    } catch (error) {
        console.error(error)
    }
})

export const authSlice = createSlice ({
    name:"auth",
    initialState,
    reducers:{}
})

export default authSlice.reducer;