import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = spinnerSlice.actions;

export default spinnerSlice.reducer;
