import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: [],
    token: null,
    credential: {},
    avatar: null,
    pending: false,
    error: false,
    errors: [],
  },
  reducers: {
    registerStarted(state) {
      state.error = false;
      state.errors = [];
      state.pending = true;
    },
    registerFinished(state, action) {
      // state.currentUser = action.payload;
      state.pending = false;
      state.error = false;
      state.errors = [];
    },
    registerError(state, action) {
      state.error = true;
      state.errors = action.payload;
      state.pending = false;
    },
    loginStarted(state) {
      state.error = false;
      state.errors = [];
      state.pending = true;
    },
    loginFinished(state, action) {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.avatar = action.payload.avatar;
    },
    persistCredential(state, action) {
      state.credential = action.payload;
    },
    loginError(state, action) {
      state.error = true;
      state.errors = action.payload;
      state.pending = false;
    },
    logoutStarted(state) {
      state.error = false;
      state.errors = [];
      state.pending = true;
    },
    logoutFinished(state) {
      state.currentUser = {};
      state.credential = {};
      state.avatar = null;
      state.pending = false;
      state.error = false;
      state.errors = [];
    },
    logoutError(state, action) {
      state.error = true;
      state.errors = action.payload;
      state.pending = false;
    },
    addAvatar(state, action) {
      state.avatar = action.payload;
    },
    setFirstTime(state, action) {
      state.currentUser.user.firstTime = false;
    },
  },
});

export const {
  registerStarted,
  registerFinished,
  registerError,
  loginStarted,
  loginFinished,
  persistCredential,
  loginError,
  logoutStarted,
  logoutFinished,
  logoutError,
  addAvatar,
  setFirstTime,
} = authSlice.actions;

export default authSlice.reducer;
