import axios from 'axios';
import {
  DELETE_EXERCISE,
  GET_EXERCISES,
  NEW_EXERCISE,
  UPDATE_EXERCISES,
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
  } catch (error) {
    console.log(error);
  }
};

export const deleteExercises = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`/api/exercises/${id}`, config);

    dispatch({
      type: DELETE_EXERCISE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateExercises = (exercise) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.put(`/api/exercises/`, { exercise }, config);
    console.log(data);
    dispatch({
      type: UPDATE_EXERCISES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
