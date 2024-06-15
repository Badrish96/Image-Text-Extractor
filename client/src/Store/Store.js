import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import imageReducer from "../Slices/imageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    images: imageReducer,
  },
});

export default store;
