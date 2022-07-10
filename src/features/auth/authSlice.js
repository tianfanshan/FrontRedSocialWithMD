import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isRegisterSuccess: false,
  isRegisterError: false,
  isLoginSuccess: false,
  isLoginError: false,
  isFollowed: false,
  isNotFollowed: false,
  registerMessage: "",
  loginMessage: "",
  logoutMessage: "",
  followMessage: "",
  followOutMessage: "",
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
    const logoutMessage = error.response;
    return thunkAPI.rejectWithValue(logoutMessage);
  }
});

export const follow = createAsyncThunk("auth/follow", async (_id, thunkAPI) => {
  try {
    return await authService.follow(_id);
  } catch (error) {
    const followMessage = error.response;
    return thunkAPI.rejectWithValue(followMessage);
  }
});

export const followOut = createAsyncThunk(
  "auth/followOut",
  async (_id, thunkAPI) => {
    try {
      return await authService.followOut(_id);
    } catch (error) {
      const followOutMessage = error.response;
      return thunkAPI.rejectWithValue(followOutMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.isLoginSuccess = false;
      state.isLoginError = false;
    },
    resetRegister: (state) => {
      state.isRegisterError = false;
      state.isRegisterSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isRegisterSuccess = true;
        state.user = action.payload;
        state.registerMessage = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRegisterError = true;
        state.registerMessage = action.payload.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoginSuccess = true;
        state.loginMessage = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginError = true;
        state.loginMessage = action.payload.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isSuccess = true;
        state.logoutMessage = action.payload.message;
      })
      .addCase(follow.fulfilled, (state, action) => {
        console.log("follow", action.payload);
        if(action.payload == String){
          notification.error({
            message:action.payload
          })
        }
      })
      .addCase(followOut.fulfilled, (state, action) => {
        console.log('followOut',action.payload)
         if(action.payload == String){
          console.log('hola')
          notification.error({
            message:action.payload
          })
        }
      });
  },
});

export const { resetLogin, resetRegister } = authSlice.actions;
export default authSlice.reducer;
