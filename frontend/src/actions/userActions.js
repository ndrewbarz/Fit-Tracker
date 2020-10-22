import {
  GET_USER,
  START_UP_DATA,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_VERIFY_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

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

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/auth/register',
      { email, password },
      config
    );

    console.log(`Link: ${data.verifyLink}, Code: ${data.verifyCode}`);
    return true;

    // dispatch({
    //   type: USER_REGISTER_SUCCESS,
    //   payload: data,
    // });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const verify = (email, verifyCode) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFY_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { token },
    } = await axios.post('/api/auth/verify', { email, verifyCode }, config);

    if (token) {
      dispatch({
        type: USER_VERIFY_SUCCESS,
      });
    }

    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: USER_LOGOUT });
};

const getToken = () => localStorage.getItem('token');

export const getStartupData = () => async (dispatch) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get('/api/user', config);
    dispatch({
      type: START_UP_DATA,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
