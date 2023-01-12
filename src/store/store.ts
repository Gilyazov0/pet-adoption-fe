import { combineReducers, configureStore } from "@reduxjs/toolkit";

import user from "./reducers/UserSlice";
import pet from "./reducers/PetSlice";

const rootReducer = combineReducers({
  user,
  pet,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
