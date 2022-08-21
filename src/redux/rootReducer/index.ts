import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import mapLocationSlice from '../slice/mapLocationSlice';
import userSlice from '../slice/userSlice';
import userProfileSlice from '../slice/userProfileSlice';
import purposeSlice from '../slice/purposeSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};
const rootReducer = combineReducers({
  userSlice,
  userProfileSlice,
  mapLocationSlice,
  purposeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
