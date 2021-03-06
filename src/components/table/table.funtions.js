const shouldResize = event => {
  return event.target.dataset.resize;
};

const isCell = event => {
  return Boolean(event.target.dataset.cell?.trim());
};

const makeRange = (start, end) => {
  const [rangeStart, rangeEnd] = start > end ? [end, start] : [start, end];

  return new Array(rangeEnd - rangeStart + 1)
    .fill('')
    .map((_, index) => rangeStart + index);
};

const getMatrix = ($targetCell, $currentCell) => {
  const targetCell = $targetCell.cellID(true);
  const currentCell = $currentCell.cellID(true);

  const columnsRange = makeRange(currentCell.columnID, targetCell.columnID);
  const rowsRange = makeRange(currentCell.rowID, targetCell.rowID);

  const matrix = columnsRange.reduce((cells, column) => {
    rowsRange.forEach(row => cells.push(`${column}:${row}`));
    return cells;
  }, []);

  return matrix;
};

const getNextCellSelector = (key, _columnID, _rowID) => {
  let [columnID, rowID] = [_columnID, _rowID];
  const minValue = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      rowID += 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      columnID += 1;
      break;
    case 'ArrowLeft':
      columnID = columnID - 1 < minValue ? minValue : columnID - 1;
      break;
    case 'ArrowUp':
      rowID = rowID - 1 < minValue ? minValue : rowID - 1;
      break;
    default:
      break;
  }

  return `[data-cell="${columnID}:${rowID}"]`;
};

export { shouldResize, isCell, makeRange, getMatrix, getNextCellSelector };
