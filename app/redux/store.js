import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./api/authApi";
import userSlice from "./features/authSlice.js"

const persistConfig = {
  key: "user",
  version: 1,
  storage,
  whitelist: ["user"],
};
 
const rootReducer = combineReducers({
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);
