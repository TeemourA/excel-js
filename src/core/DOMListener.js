import { capitalize } from './utils';

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
      const method = getMethodName(listener, 'on', capitalize);
      if (!this[method]) {
        throw new Error(
          `${method} is not implemented in ${this.name} Component`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener, 'on', capitalize);
      this.$root.off(listener, this[method]);
    });
  }
}

const getMethodName = (listenerName, prefix, modify) =>
  `${prefix}${modify(listenerName)}`;

export default DOMListener;
