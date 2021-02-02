import ExcelComponent from '@/core/ExcelComponent';
import $ from '@core/DOM';
import { changeTitle } from '@/redux/actions';
import { defaultTitle } from '@/core/constants';

class Header extends ExcelComponent {
  static className = 'excel_header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}" />
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

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(
      changeTitle({
        title: $target.text(),
      })
    );
  }
}

export default Header;
