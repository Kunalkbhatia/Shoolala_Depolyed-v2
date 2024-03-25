import axios from "axios";
import {
  loginRequest,
  loginFail,
  loginSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  loadFail,
  loadRequest,
  loadSuccess,
  logoutSuccess,
  logoutFail,
  updateRequest,
  updateSuccess,
  updateFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
} from "../reducers/User Slice/UserSlice";


export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/login`, user, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(loginSuccess(data.user));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(loginFail(payload));
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post(`/api/v1/register`, user, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(registerSuccess(data.user));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(registerFail(payload));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadRequest());
    const { data } = await axios.get(`/api/v1/me`);
    dispatch(loadSuccess(data.user));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(loadFail(payload));
  }
};


export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch(logoutSuccess());
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(logoutFail(payload));
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch(updateRequest());
    const { data } = await axios.put(`/api/v1/me/update`, user, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(updateSuccess(data.success));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(updateFail(payload));
  }
};



export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const { data } = await axios.put(`/api/v1/password/update`, passwords, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(updatePasswordSuccess(data.success));
  } catch (error) {
    const payload = error.response.data.message;
    dispatch(updatePasswordFail(payload));
  }
};


