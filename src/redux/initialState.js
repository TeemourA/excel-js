import { getFromLocalStorage } from '@core/utils';
import { cellsDefaultStyles } from '@/core/constants';

const defaultState = {
  rows: {},
  columns: {},
  cells: {},
  // cellsStyles: {},
  currentText: '',
  currentStyles: cellsDefaultStyles,
};

const initialState = getFromLocalStorage('excel-state')
  ? getFromLocalStorage('excel-state')
  : defaultState;

export default initialState;
