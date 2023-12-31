import { createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../api/localService";

const initialState = {
  user: userLocalStorage.get(),
  uploaded: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setUploaded: (state, action) => {
      state.uploaded = action.payload;
    },
  },
});

export const { setLogin, setUploaded } = userSlice.actions;
export default userSlice.reducer;
