import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: null,
  totalUsers: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
  },
});

export const { getAllUsers, setTotalUsers } = userSlice.actions;
export default userSlice.reducer;
