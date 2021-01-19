import DOMListener from '@core/DOMListener';

class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
  }
  // returns component's pattern
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
}

export default ExcelComponent;
