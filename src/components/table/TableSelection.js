class TableSelection {
  static className = 'selected';

  constructor() {
    this.cellsGroup = [];
    this.currentCell = null;
  }

  select($el) {
    this.clear();

    this.cellsGroup.push($el);
    this.currentCell = $el;

    $el.addClassname(TableSelection.className);
  }

  selectGroup($cells = []) {
    this.clear();

    this.cellsGroup = $cells;
    this.cellsGroup.forEach($cell =>
      $cell.addClassname(TableSelection.className)
    );
  }

  clear() {
    this.cellsGroup.forEach($cell =>
      $cell.removeClassname(TableSelection.className)
    );
    this.cellsGroup = [];
  }
}

export default TableSelection;
