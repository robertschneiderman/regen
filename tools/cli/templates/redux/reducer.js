import merge from 'lodash/merge';
import initialState from './initialState';

import { RECEIVE_#{TEMPLATE}S,
         RECEIVE_#{TEMPLATE},
         REMOVE_#{TEMPLATE},
         #{TEMPLATE}_ERROR
       } from './constants';

const #{template}Reducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_#{TEMPLATE}S:
      let newState = {};
      action.#{template}s.forEach(#{template} => {
        newState[#{template}.id] = #{template};
      });
      return newState;
    case RECEIVE_#{TEMPLATE}:
      const newTemplate = {[action.#{template}.id]: action.#{template}};
      return merge({}, state, newTemplate);
    case REMOVE_#{TEMPLATE}:
      newState = merge({}, state);
      delete newState[action.#{template}.id];
      return newState;
    case #{TEMPLATE}_ERROR:
      alert(action.error);
    default:
      return state;
  }
};

export default #{template}Reducer;