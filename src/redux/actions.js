import actionTypes from './actionTypes';

const tableResize = data => ({
  type: actionTypes.TABLE_RESIZE,
  payload: data,
});

const changeText = data => ({
  type: actionTypes.CHANGE_TEXT,
  payload: data,
});

export { tableResize, changeText };
