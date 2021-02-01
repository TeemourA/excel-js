import ExcelStateComponent from '@/core/ExcelStateComponent';
import createToolbar from './toolbar.template';
import $ from '@core/DOM';
import { cellsDefaultStyles } from '@core/constants';

class Toolbar extends ExcelStateComponent {
  static className = 'excel_toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscriptions: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(cellsDefaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onStoreChange(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.dataset.type === 'button') {
      const styleParams = JSON.parse($target.dataset.value);
      this.$emit('Toolbar_applyStyle', styleParams);
    }
  }
}

export default Toolbar;
