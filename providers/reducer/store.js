import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Global from "./global";

const reducers = {
  global: Global.reducer,
};

const actions = {
  global: Global.actions,
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { actions, store };

/**
 * by default redux toolkit use middleware redux-thunk.
 * this file contain reducer and actions.
 * store use to provide state store, action is like controller to change states in store
 */
