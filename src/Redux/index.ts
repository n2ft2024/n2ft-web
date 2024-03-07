import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './setting'
import filterReducer from './filter'
import { combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/es/storage';
import showmuchReducer from './showmuch'

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key:any) {
      return Promise.resolve(null);
    },
    setItem(_key:any, value:any) {
      return Promise.resolve(value);
    },
    removeItem(_key:any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined" ? createNoopStorage() : createWebStorage('local');

const persistConfig = {
  key: 'root',
  storage,
  blacklist: []
};

const reducer = combineReducers({
  setting:settingReducer,
  filter:filterReducer,
  showmutch:showmuchReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(reduxStore);
export type RootState = ReturnType<typeof reduxStore.getState>;





// import {save, load} from "redux-localstorage-simple"
// import {applyMiddleware, createStore} from "redux"
// import {configureStore} from "@reduxjs/toolkit";
// import settingReducer from './setting'

// const createStoreWithMiddleware
//     = applyMiddleware(
//     save() // Saving done here
// )(createStore)

// export const reduxStore = configureStore({
//   reducer: {
//     setting:settingReducer
//   },
//   preloadedState: load(),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
// });

// export type RootState = ReturnType<typeof reduxStore.getState>;