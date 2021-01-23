const charCodes = {
  A: 65,
  Z: 90,
};

const createCell = columnIndex => {
  return `
    <div class="cell" contenteditable data-column="${columnIndex}"></div>
  `;
};

const createColumn = (columnLetterIndex, index) => {
  return `
    <div class="column" data-type="resizable" data-column="${index}">
      ${columnLetterIndex}
      <div class="column-resize" data-resize="column"></div>
    </div>
  `;
};

const createRow = (index, rowCells) => {
  const rowIndex = index !== null ? index : '';
  const resizeElement =
    index > 0 ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row">
      <div class="row-info">
        ${rowIndex}
        ${resizeElement}
      </div>
      <div class="row-data">${rowCells}</div>
    </div>
  `;
};

const toChar = index => String.fromCharCode(charCodes.A + index);

const createTable = (rowsCount = 25) => {
  const colsCount = charCodes.Z - charCodes.A + 1;
  const rows = [];

  const firstRowColumns = new Array(colsCount)
    .fill('')
    .map((_, index) => createColumn(toChar(index), index))
    .join('');

  rows.push(createRow(null, firstRowColumns));

  for (let i = 0; i < rowsCount; i += 1) {
    const rowCells = new Array(colsCount)
      .fill('')
      .map((_, index) => createCell(index))
      .join('');

    rows.push(createRow(i + 1, rowCells));
  }

  return rows.join('');
};

export default createTable;
