// authThunks.js
import { loginSuccess, loginFailure, logout } from './authSlice';
import { login, register } from './authServices';

export const loginUser = (username:any, password:any) => async (dispatch:any) => {
  try {
    const token = await login(username, password);
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const registerUser = (username:any, password:any) => async (dispatch:any) => {
  try {
    const token = await register(username, password);
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const logoutUser = () => (dispatch:any) => {
  localStorage.removeItem('token');
  dispatch(logout());
};