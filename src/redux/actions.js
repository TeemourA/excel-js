import actionTypes from './actionTypes';

const tableResize = payload => ({
  type: actionTypes.TABLE_RESIZE,
  payload,
});

const changeText = payload => ({
  type: actionTypes.CHANGE_TEXT,
  payload,
});

const changeStyles = payload => ({
  type: actionTypes.CHANGE_STYLES,
  payload,
});

const applyStyle = payload => ({
  type: actionTypes.APPLY_STYLE,
  payload,
});

const changeTitle = payload => ({
  type: actionTypes.CHANGE_TITLE,
  payload,
});

export { tableResize, changeText, changeStyles, applyStyle, changeTitle };
