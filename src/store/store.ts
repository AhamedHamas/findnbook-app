import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import businessReducer from './business/businessReducer';

export const store = configureStore({
  reducer: {
    auth: persistReducer(
      {
        key: 'auth',
        storage: AsyncStorage,
        blacklist: [],
      },
      authReducer,
    ),
    user: persistReducer(
      {
        key: 'user',
        storage: AsyncStorage,
        blacklist: [],
      },
      userReducer,
    ),
    business: persistReducer(
      {
        key: 'business',
        storage: AsyncStorage,
        blacklist: [],
      },
      businessReducer,
    ),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
