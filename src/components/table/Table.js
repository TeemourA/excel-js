import ExcelComponent from '@/core/ExcelComponent';
import $ from '@core/DOM';
import createTable from './table.template';
import resizeHandler from './table.resize';
import TableSelection from './TableSelection';
import {
  shouldResize,
  isCell,
  getMatrix,
  getNextCellSelector,
} from './table.funtions';

class Table extends ExcelComponent {
  static className = 'excel_table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(30);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell(eventName, $cell) {
    this.selection.select($cell);
    this.$emit(eventName, $cell);
  }

  init() {
    super.init();
    const $firstCell = this.$root.find('[data-cell="0:0"]');
    this.selectCell('Table_select', $firstCell);

    this.$subscribe('Formula_onInput', text =>
      this.selection.currentCell.text(text)
    );

    this.$subscribe('Formula_focusToCell', () =>
      this.selection.currentCell.focus()
    );
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

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const { columnID, rowID } = this.selection.currentCell.cellID(true);
      const $nextCell = this.$root.find(
        getNextCellSelector(key, columnID, rowID)
      );

      this.selectCell('Table_select', $nextCell);
    }
  }

  onInput(event) {
    this.$emit('Table_input', $(event.target));
  }
}

export default Table;
