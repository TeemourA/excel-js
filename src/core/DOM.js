class DOM {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    console.log(this.$el);
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    const currentNode = node instanceof DOM ? node.$el : node;

    if (Element.prototype.append) {
      this.$el.append(currentNode);
    } else {
      this.$el.appendChild(currentNode);
    }
    return this;
  }

  get dataset() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  injectStyles(styles = {}) {
    const stylesKeyValue = Object.entries(styles);
    stylesKeyValue.forEach(([key, value]) => (this.$el.style[key] = value));
  }

  cellId(parse) {
    if (parse) {
      const [column, row] = this.cellId().split(':');
      return {
        column: Number(column),
        row: Number(row),
      };
    }
    return this.dataset.cell;
  }

  addClassname(classname) {
    this.$el.classList.add(classname);
  }

  removeClassname(classname) {
    this.$el.classList.remove(classname);
  }
}

const $ = selector => {
  return new DOM(selector);
};

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};

export default $;
