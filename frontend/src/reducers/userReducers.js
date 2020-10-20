import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
} from '../constants/userConstants';

// const initialState = {
//   email: '',
//   exercises: [],
//   workouts: [],
//   error: '',
// };

// export const userLoginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return {
//         ...state,
//         email: payload.email,
//         exercises: payload.exercises,
//         workouts: payload.workouts,
//       };
//       case SET_ERROR:
//       return {
//         ...state,
//         error: payload,
//       };
//     default:
//       return state;
//   }
// };

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: false };
    case USER_REGISTER_SUCCESS:
      return { loading: false };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true };
    case USER_VERIFY_SUCCESS:
      return { loading: false, token: action.payload };
    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
