import { SET_USER } from '../constants/userConstants';

const initialState = {
  email: '',
  _id: '',
  exercises: [],
  workouts: [],
  isVerified: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: payload.email,
        exercises: payload.exercises,
        workouts: payload.workouts,
        isVerified: payload.isVerified,
      };
    default:
      return state;
  }
};
