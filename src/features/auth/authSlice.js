import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: null ? user : null,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk("auth/register", async (user) => {
  try {
    return await authService.register(user);
  } catch (error) {
    console.error(error);
  }
});

export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.error(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, register.fulfilled,(state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // .addCase(register.fulfilled, (state, action) => {
      //   state.isSuccess = true;
      //   state.message = action.payload.message;
      // });
  },
});

export default authSlice.reducer;
