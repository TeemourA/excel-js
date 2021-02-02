const getMethodName = (listenerName, prefix, modify) =>
  `${prefix}${modify(listenerName)}`;

const capitalize = string => {
  if (typeof string !== 'string') {
    return '';
  }
  const capitalizedLetter = string.charAt(0).toUpperCase();
  const stringWithoutFirstLetter = string.slice(1);
  const result = capitalizedLetter.concat(stringWithoutFirstLetter);

  return result;
};

const saveInLocalStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

const calcDelta = (pageCoords, elementCoords) => pageCoords - elementCoords;
const calcSize = (elementCoords, delta) => elementCoords + delta;
const toPixels = dimension => `${dimension}px`;

const isEqual = (prev, next) => {
  if (typeof prev === 'object' && typeof next === 'object') {
    return JSON.stringify(prev) === JSON.stringify(next);
  }

  return prev === next;
};

const camelToDashCase = str =>
  str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);

const toInlineStyles = (styles = {}) =>
  Object.entries(styles)
    .map(([key, value]) => `${camelToDashCase(key)}: ${value}`)
    .join('; ');

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    const callback = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

export {
  getMethodName,
  capitalize,
  saveInLocalStorage,
  getFromLocalStorage,
  calcDelta,
  calcSize,
  toPixels,
  isEqual,
  camelToDashCase,
  toInlineStyles,
  debounce,
};
