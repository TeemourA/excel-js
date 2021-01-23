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

      document.onmousemove = e => {
        const resizeDelta = e.pageX - parentCoords.right;
        const calculatedWidth = `${parentCoords.width + resizeDelta}px`;
        $parent.$el.style.width = calculatedWidth;

        document
          .querySelectorAll(`[data-column="${$parent.dataset.column}"]`)
          .forEach(el => (el.style.width = calculatedWidth));
      };

      document.onmouseup = () => {
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
