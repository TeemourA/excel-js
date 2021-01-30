import actionTypes from './actionTypes';

const resizeTable = (state, action) => {
  const field = action.payload.type === 'column' ? 'columns' : 'rows';
  const updatedSize = state[field] || {};
  updatedSize[action.payload.id] = action.payload.value;

  return { ...state, [field]: updatedSize };
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TABLE_RESIZE:
      return resizeTable(state, action);
    default:
      return state;
  }
};

export default reducer;
