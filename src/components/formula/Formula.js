import ExcelComponent from '@/core/ExcelComponent';

class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  static className = 'excel_formula';

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log('Formula onInput', event.target.textContent.trim(), this);
  }

  onClick(event) {
    console.log('onClick', event);
  }
}

export default Formula;
