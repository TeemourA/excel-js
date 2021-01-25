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
      listeners: ['mousedown'],
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
}

export default Table;
