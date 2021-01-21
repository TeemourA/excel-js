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
