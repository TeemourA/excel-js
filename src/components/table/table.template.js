import { toPixels } from '@core/utils';

const charCodes = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const getWidth = (state, index) => {
  return state[index] || toPixels(DEFAULT_WIDTH);
};

const getHeight = (state, index) => {
  return state[index] || toPixels(DEFAULT_HEIGHT);
};

const createCell = (state, rowIndex) => (_, columnIndex) =>
  `
    <div
      class="cell"
      contenteditable
      data-column="${columnIndex}"
      data-cell="${columnIndex}:${rowIndex}"
      style="width: ${getWidth(state, columnIndex)}"
    ></div>
  `;

const createColumn = ({ char, index, width }) => {
  return `
    <div
      class="column"
      data-type="resizable"
      data-column="${index}"
      style="width: ${width}"
    >
      ${char}
      <div class="column-resize" data-resize="column"></div>
    </div>
  `;
};

const createRow = (index, rowCells, state = {}) => {
  const rowIndex = index !== null ? index : '';
  const height = getHeight(state, index - 1);
  const resizeElement =
    index > 0 ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${rowIndex - 1}"
      style="height: ${height}"
    >
      <div class="row-info">${rowIndex} ${resizeElement}</div>
      <div class="row-data">${rowCells}</div>
    </div>
  `;
};

const toChar = (_, index) => String.fromCharCode(charCodes.A + index);

const withWidthFrom = state => (char, index) => ({
  char,
  index,
  width: getWidth(state, index),
});

const createTable = (rowsCount = 25, state) => {
  console.log(state);
  const colsCount = charCodes.Z - charCodes.A + 1;
  const rows = [];

  const firstRowColumns = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state.columns))
    .map((char, index) => createColumn(char, index))
    .join('');

  rows.push(createRow(null, firstRowColumns));

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex += 1) {
    const rowCells = new Array(colsCount)
      .fill('')
      .map(createCell(state.columns, rowIndex))
      .join('');

    rows.push(createRow(rowIndex + 1, rowCells, state.rows));
  }

  return rows.join('');
};

export default createTable;
