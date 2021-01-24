import ExcelComponent from '@/core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import shouldResize from './table.funtions';

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
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
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
