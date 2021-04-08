import { createStore, compose, applyMiddleware } from "redux";

const enhencer =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const listeners = [];

const getActionMiddleware = (store) => (next) => (action) => {
  listeners.forEach((f) => f(action));
  return next(action);
};

const store = createStore(() => {},
enhencer(applyMiddleware(getActionMiddleware)));

store.onDispatch = (callback) => {
  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }
  const unsubscribe = subscribeListeners((action) => {
    callback(action);
  });
  return () => {
    unsubscribe();
  };
};

const subscribeListeners = (callback) => {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index < 0) return;
    listeners.splice(index, 1);
  };
};

export default store;
