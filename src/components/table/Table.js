import ExcelComponent from '@/core/ExcelComponent';
import createTable from './table.template';

class Table extends ExcelComponent {
  static className = 'excel_table';

  toHTML() {
    return createTable(300);
  }
}

export default Table;
