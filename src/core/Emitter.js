class Emitter {
  constructor() {
    this.subscribers = [];
  }

  subscribe(eventName, fn) {
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(fn);

    return () => {
      this.subscribers[eventName] = this.subscribers[eventName].filter(
        subscriber => subscriber !== fn
      );
    };
  }

  emit(eventName, ...args) {
    if (!Array.isArray(this.subscribers[eventName])) return false;

    this.subscribers[eventName].forEach(subscriber => {
      subscriber(...args);
    });

    return true;
  }
}

export default Emitter;
