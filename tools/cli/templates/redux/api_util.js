import { axioss, ROOT_URL } from '../../../common/config';

export const fetchTemplates = (success) => {
  axioss.get(`#{template}s`)
  .then(success)
  .catch(function(error) {
    console.log(error);
  });
};

export const fetchTemplate = (id, success) => {
  axioss.get(`#{template}s/${id}`)
  .then(success)
  .catch(function(error) {
    console.log(error);
  });
};

export const createTemplate = (#{template}, success, error) => {
  axioss.post(`#{template}s`)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};

export const updateTemplate = (#{template}, success) => {
  axioss.patch(`#{template}s/${#{template}.id}`)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};

export const destroyTemplate = (#{template}, success) => {
  axioss.delete(`#{template}s/${#{template}.id}`)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};