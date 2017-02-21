import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from '../pages/auth/redux/reducer';
import authReducer from '../pages/auth/redux/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  form,
  auth: authReducer,
  auth: authReducer,
});

export default rootReducer;
