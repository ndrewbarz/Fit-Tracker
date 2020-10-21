import axios from 'axios';
import {
  EXERCISE_FAIL,
  EXERCISE_REQUEST,
  EXERCISE_SUCCESS,
} from '../constants/exerciseConstants';

export const exercises = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EXERCISE_REQUEST,
    });
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/exercises/${id}`, config);

    dispatch({
      type: EXERCISE_SUCCESS,
      payload: data,
    });

    // localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
