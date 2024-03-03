import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import accountReducer from '../redux/account/accountSlide'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import orderSlice from './order/orderSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['account'] // navigation will not be persisted
}

const rootReducer = combineReducers({
  counter: counterReducer,
  account: accountReducer,
  order: orderSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

export { persistor, store }
// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     account: accountReducer
//   },
// });
