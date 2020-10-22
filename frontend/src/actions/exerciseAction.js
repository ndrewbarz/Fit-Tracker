import axios from 'axios';
import {
  EXERCISE_FAIL,
  EXERCISE_REQUEST,
  EXERCISE_SUCCESS,
  NEW_EXERCISE,
} from '../constants/exerciseConstants';

export const newExercise = (id) => async (dispatch) => {
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
      type: NEW_EXERCISE,
      payload: data,
    });

    // localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
