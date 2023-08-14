import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "./reducers/user";
import storeReducer from "./reducers/store";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart", "user"],
};

export const rootReducers = combineReducers({
  user: userReducer,
  store: storeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export default store;
