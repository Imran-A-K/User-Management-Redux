import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { id: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { id, token } = action.payload;
      state.id = id;
      state.token = token;
    },
    logOut: (state, action) => {
      state.id = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state) => state.auth.id;
export const selectCurrentUserToken = (state) => state.auth.token;
