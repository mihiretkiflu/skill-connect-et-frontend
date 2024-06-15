import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
    token: null,
    avatar: null,
  },
  reducers: {
    loginFinished(state, action) {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.avatar = action.payload?.avatar;
    },
    logoutFinished(state) {
      state.currentUser = {};
      state.token = null;
      state.avatar = null;
    },
    addAvatar(state, action) {
      state.avatar = action.payload;
    },
    fillFProfile(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { loginFinished, logoutFinished, addAvatar, fillFProfile } =
  authSlice.actions;

export default authSlice.reducer;
