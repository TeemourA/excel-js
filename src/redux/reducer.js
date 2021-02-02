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

const applyStyle = (state, action) => {
  const updatedCellsStyles = state.cellsStyles || {};
  action.payload.ids.forEach(
    id =>
      (updatedCellsStyles[id] = {
        ...updatedCellsStyles[id],
        ...action.payload.styleParams,
      })
  );

  return {
    ...state,
    cellsStyles: updatedCellsStyles,
    currentStyles: { ...state.currentStyles, ...action.payload.styleParams },
  };
};

const changeTitle = (state, action) => ({
  ...state,
  title: action.payload.title,
});

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TABLE_RESIZE:
      return resizeTable(state, action);
    case actionTypes.CHANGE_TEXT:
      return changeText(state, action);
    case actionTypes.CHANGE_STYLES:
      return changeStyles(state, action);
    case actionTypes.APPLY_STYLE:
      return applyStyle(state, action);
    case actionTypes.CHANGE_TITLE:
      return changeTitle(state, action);
    default:
      return state;
  }
};

export default reducer;
