import ExcelComponent from '@/core/ExcelComponent';
import $ from '@core/DOM';
class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  static className = 'excel_formula';

  toHTML() {
    return `
      <div class="info">fx</div>
      <div
        class="input"
        data-type="formula"
        contenteditable
        spellcheck="false"
      ></div>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('[data-type="formula"]');

    this.$on('Table_select', $cell => this.$formula.text($cell.text()));
    this.$on('Table_input', $cell => this.$formula.text($cell.text()));

    this.$subscribe(state => console.log('FormulaState', state));
  }

  onInput(event) {
    const text = $(event.target).text();
    this.$emit('Formula_onInput', text);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      this.$emit('Formula_focusToCell');
    }
  }
}

export default Formula;
