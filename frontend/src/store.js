import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userVerifyReducer,
} from './reducers/userReducers';
import { getExercisesReducer } from './reducers/exerciseReducer';

// const reducer = combineReducers({
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   userVerify: userVerifyReducer,
// });

const reducer = combineReducers({
  user: userLoginReducer,
  userRegisterReducer,
  auth: userVerifyReducer,
  exercises: getExercisesReducer,
});

const userInfoFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user: userInfoFromStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
