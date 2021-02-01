import DOMListener from '@core/DOMListener';

class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.subscriptions = options.subscriptions || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}
  // returns component's pattern
  toHTML() {
    return '';
  }

  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  $on(eventName, fn) {
    const unsubscribe = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsubscribe);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  onStoreChange() {}

  isWatching(key) {
    return this.subscriptions.includes(key);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsubscribe => unsubscribe());
  }
}

export default ExcelComponent;
