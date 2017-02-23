import { axioss, ROOT_URL } from '../../common/config';

export const fetch#{Template}s = (success) => {
  axioss.get(`#{template}s`)
  .then(success)
  .catch(function(error) {
    console.log(error);
  });
};

export const fetch#{Template} = (id, success) => {
  axioss.get(`#{template}s/${id}`)
  .then(success)
  .catch(function(error) {
    console.log(error);
  });
};

export const create#{Template} = (#{template}, success, error) => {
  axioss.post(`#{template}s`)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};

export const update#{Template} = (#{template}, success) => {
  axioss.patch(`#{template}s/${#{template}.id}`)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};

export const destroy#{Template} = (#{template}, success) => {
  axioss.delete(`#{template}s/${#{template}.id}`)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};