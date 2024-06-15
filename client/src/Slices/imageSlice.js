import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  images: [],
  loading: false,
  error: null,
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    uploadImageStart(state) {
      state.loading = true;
      state.error = null;
    },
    uploadImageSuccess(state, action) {
      state.loading = false;
      state.images.push(action.payload);
    },
    uploadImageFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchImagesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchImagesSuccess(state, action) {
      state.loading = false;
      state.images = action.payload;
    },
    fetchImagesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  uploadImageStart,
  uploadImageSuccess,
  uploadImageFailure,
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
} = imageSlice.actions;

export const uploadImage =
  ({ file, token }) =>
  async (dispatch) => {
    dispatch(uploadImageStart());
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:5000/api/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );

      dispatch(uploadImageSuccess(response.data));
    } catch (error) {
      dispatch(
        uploadImageFailure(error.response?.data?.message || error.message)
      );
    }
  };

export const selectImages = (state) => state.images;

export default imageSlice.reducer;
