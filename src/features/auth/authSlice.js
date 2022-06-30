import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user:null ? user:null
}


export const register = createAsyncThunk('auth/register',async (user) => {
    try {
        return await authService.register(user)
    } catch (error) {
        console.error(error)
    }
})

export const login = createAsyncThunk('auth/register',async(user) =>{
    try {
        return await authService.login(user)
    } catch (error) {
        console.error(error)
    }
})

export const logout = createAsyncThunk('auth/logout',async()=>{
    try {
        return await authService.logout()
    } catch (error) {
        console.error(error)
    }
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            state.user = action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
        })
    }
})

export default authSlice.reducer;