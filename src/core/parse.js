const parse = (value = '') => {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (e) {
      console.warn('Skipping parsing error:', e.message);
    }
  }
  return value;
};

export default parse;
