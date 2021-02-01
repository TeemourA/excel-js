const createStore = (reducer, initialState = {}) => {
  let state = reducer({ ...initialState }, { type: '__INIT__' });
  let subscribers = [];

  return {
    subscribe(fn) {
      subscribers.push(fn);

      return {
        unsubscribe() {
          subscribers = subscribers.filter(subscriber => subscriber !== fn);
        },
      };
    },
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach(subscriber => subscriber(state));
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
};

export default createStore;
