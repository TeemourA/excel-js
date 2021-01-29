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

export {
  capitalize,
  saveInLocalStorage,
  getFromLocalStorage,
  calcDelta,
  calcSize,
  toPixels,
};
