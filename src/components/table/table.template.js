const charCodes = {
  A: 65,
  Z: 90,
};

const createCell = () => {
  return ` <div class="cell" contenteditable></div> `;
};

const createColumn = columnLetterIndex => {
  return `<div class="column">${columnLetterIndex}</div>`;
};

const createRow = (index, rowCells) => {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
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
    .map((_, index) => createColumn(toChar(index)))
    .join('');

  rows.push(createRow(null, firstRowColumns));

  for (let i = 0; i < rowsCount; i += 1) {
    const rowCells = new Array(colsCount).fill('').map(createCell).join('');

    rows.push(createRow(i + 1, rowCells));
  }

  return rows.join('');
};

export default createTable;
