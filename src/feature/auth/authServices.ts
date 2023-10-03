// authService.js
import axios from 'axios';
import apiUrl from '../../services/Api';



export const login = async (username:any, password:any) => {
  try {
    const response = await axios.post(`${apiUrl}/infoUsers`, { username, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  } catch (error:any) {
    throw error.response.data.error;
  }
};

export const register = async (username:any, password:any) => {
  try {
    const response = await axios.post(`${apiUrl}/infoUsers`, { username, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  } catch (error:any) {
    throw error.response.data.error;
  }
};