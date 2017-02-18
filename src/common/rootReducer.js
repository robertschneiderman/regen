import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import historyReducer from '../pages/history/redux/reducer';
import historyReducer from '../pages/history/redux/reducer';
import historyReducer from '../pages/history/redux/reducer';
import historyReducer from '../pages/history/redux/reducer';
import historyReducer from '../pages/history/redux/reducer';
import historyReducer from '../pages/history/redux/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  history: historyReducer,
  history: historyReducer,
  history: historyReducer,
  history: historyReducer,
  history: historyReducer,
  history: historyReducer,
});

export default rootReducer;
