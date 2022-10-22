import { configureStore } from "@reduxjs/toolkit";
import Components from "./components";
import User from "./user";

const reducers = {
  user: User.reducer,
  components: Components.reducer,
};

const actions = {
  userAction: User.actions,
  componentAction: Components.actions,
};

const store = configureStore({
  reducer: reducers,
});

export { actions, store };

/**
 * by default redux toolkit use middleware redux-thunk.
 * this file contain reducer and actions.
 * store use to provide state store, action is like controller to change states in store
 */
