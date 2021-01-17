class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getComponents() {
    const $root = document.createElement('div');
    $root.classList.add('components-root');

    const components = this.components
      .map(Component => {
        const component = new Component();
        return component.toHTML();
      })
      .join('');

      $root.insertAdjacentHTML('afterbegin', components);

    return $root;
  }

  render() {
    this.$el.append(this.getComponents());
  }
}

export default Excel;
