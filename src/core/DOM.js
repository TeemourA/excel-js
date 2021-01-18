class DOM {
  constructor() {}
}

const $ = () => {
  return new DOM();
};

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return el;
};

export default $;
