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
  const targetCell = $targetCell.cellId(true);
  const currentCell = $currentCell.cellId(true);

  const columnsRange = makeRange(currentCell.column, targetCell.column);
  const rowsRange = makeRange(currentCell.row, targetCell.row);

  const matrix = columnsRange.reduce((cells, column) => {
    rowsRange.forEach(row => cells.push(`${column}:${row}`));
    return cells;
  }, []);

  return matrix;
};

export { shouldResize, isCell, makeRange, getMatrix };
