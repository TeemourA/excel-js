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

    $el.focus().addClassname(TableSelection.className);
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

  applyStyle(styles) {
    this.cellsGroup.forEach($cell => $cell.injectStyles(styles));
  }

  getSelectedCellsIDs() {
    return this.cellsGroup.map($cell => $cell.cellID());
  }
}

export default TableSelection;
