import ExcelComponent from '@/core/ExcelComponent';
import createTable from './table.template';
import $ from '@core/DOM';

class Table extends ExcelComponent {
  static className = 'excel_table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  name = 'Table';

  toHTML() {
    return createTable(300);
  }

  //   onClick() {
  //     console.log(`[${this.name}] onClick`);
  //   }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const parentCoords = $parent.getCoords();
      const type = $resizer.dataset.resize;
      const columnCells = this.$root.findAll(
        `[data-column="${$parent.dataset.column}"]`
      );

      $resizer.injectStyles({ opacity: 1 });

      document.onmousemove = e => {
        if (type === 'column') {
          const resizeDelta = e.pageX - parentCoords.right;
          const calculatedWidth = `${parentCoords.width + resizeDelta}px`;
          $parent.injectStyles({ width: calculatedWidth });

          columnCells.forEach(cell => (cell.style.width = calculatedWidth));
        } else {
          const resizeDelta = e.pageY - parentCoords.bottom;
          const calculatedHeight = `${parentCoords.height + resizeDelta}px`;
          $parent.injectStyles({ height: calculatedHeight });
        }
      };

      document.onmouseup = () => {
      $resizer.injectStyles({ opacity: 0 });
        document.onmousemove = null;
      };
    }
  }

  //   onMouseup() {
  //     console.log(`[${this.name}] onMouseup`);
  //   }

  //   onMousemove() {
  //     console.log(`[${this.name}] onMousemove`);
  //   }
}

export default Table;
