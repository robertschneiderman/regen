// #{Template} API Util
import { fetch#{Template}s,
         fetch#{Template},
         create#{Template},
         update#{Template},
         destroy#{Template}
       } from './api_util';
// #{Template} Action
import { request#{Template}s,
         request#{Template},
         receive#{Template},
         receive#{Template}s,
         remove#{Template},
         #{template}Error,
// #{Template} Constants
         REQUEST_#{TEMPLATE}S,
         REQUEST_#{TEMPLATE},
         CREATE_#{TEMPLATE},
         UPDATE_#{TEMPLATE},
         DESTROY_#{TEMPLATE},
       } from './actions';

export default ({getState, dispatch}) => next => action => {
  const #{template}sSuccess = data => dispatch(receive#{Template}s(data));
  const #{template}Success = data => dispatch(receive#{Template}(data));
  const #{template}Removed = data => dispatch(remove#{Template}(data));
  const #{template}Errored = data => dispatch(#{template}Error(data.responseJSON));
  switch(action.type){
    case REQUEST_#{TEMPLATE}S:
      fetch#{Template}s(#{template}Success);
      return next(action);
    case REQUEST_#{TEMPLATE}:
      fetch#{Template}(action.id, #{template}Success);
      return next(action);
    case CREATE_#{TEMPLATE}:
      create#{Template}(action.id, #{template}Success, #{template}Errored);
      return next(action);
    case UPDATE_#{TEMPLATE}:
      update#{Template}(action.#{template}, #{template}Success);
      return next(action);
    case DESTROY_#{TEMPLATE}:
      destroy#{Template}(action.#{template}, #{template}Removed);
      return next(action);
    default:
      return next(action);
  }
};