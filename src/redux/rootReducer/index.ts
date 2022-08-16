import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import chatSlice from '../slice/chatSlice';
import mapLocationSlice from '../slice/mapLocationSlice';
import userSlice from '../slice/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};
const rootReducer = combineReducers({
  chatSlice,
  userSlice,
  mapLocationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
