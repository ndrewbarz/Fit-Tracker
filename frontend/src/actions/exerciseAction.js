import axios from 'axios';
import {
  EXERCISE_FAIL,
  EXERCISE_REQUEST,
  EXERCISE_SUCCESS,
  GET_EXERCISES,
  NEW_EXERCISE,
} from '../constants/exerciseConstants';

export const newExercise = (id, name, measurementType) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `/api/exercises/${id}`,
      { name, measurementType },
      config
    );
    console.log(data);
    dispatch({
      type: NEW_EXERCISE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getExercises = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/exercises/${id}`, config);
    dispatch({
      type: GET_EXERCISES,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const getExercisesSuccess = (payload) => ({
  type: GET_EXERCISES,
  payload,
});
