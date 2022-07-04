import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: null ? user : null,
  isError: false,
  isSuccess: false,
  registerMessage: "",
  loginMessage:"",
  logoutMessage:""
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const registerMessage = error.response.data;
      return thunkAPI.rejectWithValue(registerMessage);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const loginMessage = error.response.data;
    return thunkAPI.rejectWithValue(loginMessage);
  }
});

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const logoutMessage = error.response
    return thunkAPI.rejectWithValue(logoutMessage)
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.loginMessage = "";
    },
    logoutReset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.logoutMessage = "";
    },
    registerReset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.registerMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload;
        state.registerMessage = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.registerMessage = action.payload.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.loginMessage = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.loginMessage = action.payload.message;
      })
      .addCase(logout.fulfilled, (state,action) => {
        state.user = null;
        state.isSuccess = true
        state.logoutMessage = action.payload.message
      })
  },
});

export const { loginReset,logoutReset,registerReset } = authSlice.actions;

export default authSlice.reducer;
