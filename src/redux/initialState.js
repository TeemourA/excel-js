import { getFromLocalStorage } from '@core/utils';
import { cellsDefaultStyles, defaultTitle } from '@/core/constants';

const defaultState = {
  title: defaultTitle,
  rows: {},
  columns: {},
  cells: {},
  cellsStyles: {},
  currentText: '',
  currentStyles: cellsDefaultStyles,
};

const normalizeStorageState = state => ({
  ...state,
  currentStyles: cellsDefaultStyles,
  currentText: '',
});

const initialState = getFromLocalStorage('excel-state')
  ? normalizeStorageState(getFromLocalStorage('excel-state'))
  : defaultState;

export default initialState;
