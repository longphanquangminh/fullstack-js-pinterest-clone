import { createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../api/localService";

const initialState = {
  user: userLocalStorage.get(),
  uploaded: false,
  saved: false,
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
    setSaved: (state, action) => {
      state.saved = action.payload;
    },
  },
});

export const { setLogin, setUploaded, setSaved } = userSlice.actions;
export default userSlice.reducer;
