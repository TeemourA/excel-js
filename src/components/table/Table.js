import ExcelComponent from '@/core/ExcelComponent';
import $ from '@core/DOM';
import createTable from './table.template';
import resizeHandler from './table.resize';
import TableSelection from './TableSelection';
import { cellsDefaultStyles } from '@core/constants';
import {
  tableResize,
  changeText,
  changeStyles,
  // applyStyle,
} from '@/redux/actions';
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
    return createTable(30, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell(eventName, $cell) {
    this.selection.select($cell);
    this.$emit(eventName, $cell);

    const stylesList = $cell.getStyles(Object.keys(cellsDefaultStyles));
    this.$dispatch(changeStyles(stylesList));
  }

  init() {
    super.init();
    const $firstCell = this.$root.find('[data-cell="0:0"]');
    this.selectCell('Table_select', $firstCell);

    this.$on('Fosrmula_onInput', text => {
      this.selection.currentCell.text(text);

      const id = this.selection.currentCell.cellID();
      this.updateCellsState(id, text);
    });

    this.$on('Formula_focusToCell', () => this.selection.currentCell.focus());

    this.$on('Toolbar_applyStyle', styleParams => {
      this.selection.applyStyle(styleParams);

      // this.$dispatch(
      //   applyStyle({
      //     ids: this.selection.cellsGroup.getIDs(),
      //     styleParams,
      //   })
      // );
    });
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(tableResize(data));
    } catch (e) {
      console.error('[resizeTable]', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cellsGroup = getMatrix(
          $target,
          this.selection.currentCell
        ).map(cell => this.$root.find(`[data-cell="${cell}"]`));

        this.selection.selectGroup($cellsGroup);
      } else {
        this.selectCell('Table_select', $target);
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

  updateCellsState(id, text) {
    this.$dispatch(
      changeText({
        id,
        text,
      })
    );
  }

  onInput(event) {
    const text = $(event.target).text();
    const id = this.selection.currentCell.cellID();
    this.updateCellsState(id, text);
    // this.$emit('Table_input', $(event.target));
  }
}

export default Table;
