import capitalizeFirstLetter from './utils';

class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root element provided to DOMListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener, 'on', capitalizeFirstLetter);
      if (!this[method]) {
        throw new Error(
          `${method} is not implemented in ${this.name} Component`
        );
      }
      console.log(this, method, this[method]);
      this.$root.on(listener, this[method].bind(this));
    });
  }

  removeDOMListeners() {}
}

const getMethodName = (listenerName, prefix, modify) =>
  `${prefix}${modify(listenerName)}`;

export default DOMListener;
