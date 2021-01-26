import ExcelComponent from '@/core/ExcelComponent';
import $ from '@core/DOM';
import createTable from './table.template';
import resizeHandler from './table.resize';
import { shouldResize, isCell, getMatrix } from './table.funtions';
import TableSelection from './TableSelection';

class Table extends ExcelComponent {
  static className = 'excel_table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });
  }

  name = 'Table';

  toHTML() {
    return createTable(30);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $firstCell = this.$root.find('[data-cell="0:0"]');
    this.selection.select($firstCell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cellsGroup = getMatrix(
          $target,
          this.selection.currentCell
        ).map(cell => this.$root.find(`[data-cell="${cell}"]`));

        this.selection.selectGroup($cellsGroup);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event;

    if (keys.includes(key)) {
      event.preventDefault();

      const { columnID, rowID } = this.selection.currentCell.cellID(true);
      const $nextCell = this.$root.find(
        getNextCellSelector(key, columnID, rowID)
      );
      this.selection.select($nextCell);
      console.log(key, columnID, rowID);
    }
  }
}

const getNextCellSelector = (key, _columnID, _rowID) => {
  let [columnID, rowID] = [_columnID, _rowID];
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
      columnID -= 1;
      break;
    case 'ArrowUp':
      rowID -= 1;
      break;
    default:
      break;
  }

  return `[data-cell="${columnID}:${rowID}"]`;
};

export default Table;
