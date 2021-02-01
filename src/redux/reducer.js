import actionTypes from './actionTypes';

const resizeTable = (state, action) => {
  const field = action.payload.type === 'column' ? 'columns' : 'rows';
  const updatedSize = state[field] || {};
  updatedSize[action.payload.id] = action.payload.value;

  return { ...state, [field]: updatedSize };
};

const changeText = (state, action) => {
  const updatedCells = state.cells || {};
  updatedCells[action.payload.id] = action.payload.text;
  return {
    ...state,
    cells: updatedCells,
    currentText: action.payload.text,
  };
};

const changeStyles = (state, action) => ({
  ...state,
  currentStyles: action.payload,
});

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TABLE_RESIZE:
      return resizeTable(state, action);
    case actionTypes.CHANGE_TEXT:
      return changeText(state, action);
    case actionTypes.CHANGE_STYLES:
      return changeStyles(state, action);
    default:
      return state;
  }
};

export default reducer;
