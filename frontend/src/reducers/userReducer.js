import {
  DELETE_EXERCISE,
  GET_EXERCISES,
  NEW_EXERCISE,
  UPDATE_EXERCISES,
} from '../constants/exerciseConstants';
import { GET_USER, SET_USER, VERIFY_USER } from '../constants/userConstants';

const initialState = {
  _id: '',
  email: '',
  isVerified: false,
  exercises: [],
  workouts: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        _id: action.payload._id,
        email: action.payload.email,
        isVerified: action.payload.isVerified,
        exercises: action.payload.exercises,
        workouts: action.payload.workouts,
      };
    case NEW_EXERCISE:
      return { ...state, exercises: [action.payload] };
    case GET_EXERCISES:
      return { ...state, exercises: action.payload };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(
          (exercise) => exercise._id !== action.payload
        ),
      };
    case UPDATE_EXERCISES:
      return {
        ...state,
        exercises: [action.payload],
      };
    default:
      return state;
  }
};
