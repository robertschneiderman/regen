import merge from 'lodash/merge';
import initialState from './initialState';

import { RECEIVE_HISTORYS,
         RECEIVE_HISTORY,
         REMOVE_HISTORY,
         HISTORY_ERROR
       } from '../actions/template_actions';

const historyReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_HISTORYS:
      let newState = {};
      action.templates.forEach(template => {
        newState[template.id] = template;
      });
      return newState;
    case RECEIVE_HISTORY:
      const newTemplate = {[action.template.id]: action.template};
      return merge({}, state, newTemplate);
    case REMOVE_HISTORY:
      newState = merge({}, state);
      delete newState[action.template.id];
      return newState;
    case HISTORY_ERROR:
      alert(action.error);
    default:
      return state;
  }
};

export default historyReducer;