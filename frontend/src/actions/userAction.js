import axios from 'axios';
import { SET_USER } from '../constants/userConstants';

export const register = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/api/auth/register', { email, password }, config);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/auth/login',
      { email, password },
      config
    );

    const { token } = data;
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verify = (email, verifyCode) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/auth/verify',
      { email, verifyCode },
      config
    );
    const { token } = data;
    console.log(data);
    if (token) {
      dispatch({
        type: SET_USER,
        payload: data,
      });
    }

    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get('/api/user', config);
    if (data) {
      dispatch({
        type: SET_USER,
        payload: data,
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_USER,
      payload: {},
    });
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
