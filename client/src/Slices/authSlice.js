import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("accessToken");
let user = localStorage.getItem("user");

try {
  user = user ? JSON.parse(user) : null;
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
  user = null;
}

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  user: user || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    setUser(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;

// Async action to log in
export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials
    );
    const { accessToken, user } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(loginSuccess({ token: accessToken, user }));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Async action to register
export const register = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      userData
    );
    const { accessToken, user } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(loginSuccess({ token: accessToken, user }));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
