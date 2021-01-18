class DOMListener {
  constructor($root) {
    if (!$root) {
      throw new Error('No $root element provided to DOMListener');
    }
    this.$root = $root;
  }
}

export default DOMListener;
