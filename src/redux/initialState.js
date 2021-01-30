import { getFromLocalStorage } from '@core/utils';

const defaultState = {
  rows: {},
  columns: {},
};

const initialState = getFromLocalStorage('excel-state')
  ? getFromLocalStorage('excel-state')
  : defaultState;

export default initialState;
