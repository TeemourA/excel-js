import actionTypes from './actionTypes';

const reducer = (state, action) => {
  let columnsState;
  switch (action.type) {
    case actionTypes.TABLE_RESIZE:
      columnsState = state.columns || {};
      columnsState[action.payload.id] = action.payload.value;
      return { ...state, columns: columnsState };
    default:
      return state;
  }
};

export default reducer;
