import actionTypes from './actionTypes';

const tableResize = data => ({
  type: actionTypes.TABLE_RESIZE,
  payload: data,
});

export { tableResize };