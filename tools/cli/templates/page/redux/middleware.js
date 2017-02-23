// #{Template} API Util
import { 
       } from './api_util';
// #{Template} Action
import { 
// #{Template} Constants
       } from './actions';

export default ({getState, dispatch}) => next => action => {
  switch(action.type){
    default:
      return next(action);
  }
};