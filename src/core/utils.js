const capitalize = string => {
  if (typeof string !== 'string') {
    return '';
  }
  const capitalizedLetter = string.charAt(0).toUpperCase();
  const stringWithoutFirstLetter = string.slice(1);
  const result = capitalizedLetter.concat(stringWithoutFirstLetter);

  return result;
};

export default capitalize;
