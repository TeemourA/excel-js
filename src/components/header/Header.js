import ExcelComponent from '@/core/ExcelComponent';

class Header extends ExcelComponent {
  static className = 'excel_header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHTML() {
    return `
      <input type="text" class="input" value="Новая таблица" />
      <div class="buttons">
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `;
  }
}

export default Header;
