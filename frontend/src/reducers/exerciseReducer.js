import {
  EXERCISE_REQUEST,
  EXERCISE_SUCCESS,
  NEW_EXERCISE,
} from '../constants/exerciseConstants';

export const getExercisesReducer = (state = {}, action) => {
  switch (action.type) {
    case EXERCISE_REQUEST:
      return { loading: true, exercises: [] };
    case EXERCISE_SUCCESS:
      return { loading: false, exercises: action.payload };
    // case EXERCISE_FAIL:
    //   return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newExercise = (state = {}, action) => {
  switch (action.type) {
    case NEW_EXERCISE:
      return { ...state }, action.payload;
    default:
      return state;
  }
};
