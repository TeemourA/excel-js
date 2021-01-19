class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root element provided to DOMListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    console.log(this.listeners);
  }

  removeDOMListeners() {}
}

export default DOMListener;
