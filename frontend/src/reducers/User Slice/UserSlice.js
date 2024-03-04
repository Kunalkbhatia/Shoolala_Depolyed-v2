import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
  },

  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    registerRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },

    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    registerFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    loadRequest: (state, action) => {
      state.loading = true;
    },

    loadSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    loadFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRequest: (state, action) => {
      state.loading = true;
    },

    updateSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },

    updateFail: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    updateReset: (state, action) => {
      state.isUpdated = false;
    },
    updatePasswordRequest: (state, action) => {
      state.loading = true;
    },

    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },

    updatePasswordFail: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    updatePasswordReset: (state, action) => {
      state.isUpdated = false;
    },
    clearUserErrors: (state,action) => {
      state.error = null
  }
  },
});

export const {
  loginSuccess,
  loginFail,
  loginRequest,
  registerSuccess,
  registerFail,
  registerRequest,
  loadFail,
  loadRequest,
  loadSuccess,
  logoutSuccess,
  logoutFail,
  updateFail,
  updateRequest,
  updateSuccess,
  updateReset,
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordReset,
  updatePasswordSuccess,
  clearUserErrors,
} = userSlice.actions;
export default userSlice.reducer;
