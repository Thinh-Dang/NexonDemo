import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from '../slice/userSlice';
import purposeSlice from '../slice/purposeSlice';
import settingsSlice from '../slice/settingsSlice';
import userBlockSlice from '../slice/userBlockSlice';
import mapLocationSlice from '../slice/mapLocationSlice';
import userProfileSlice from '../slice/userProfileSlice';
import notificationSlice from '../slice/notificationSlice';
import userLikeStackSlice from '../slice/userLikeStackSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};
const rootReducer = combineReducers({
  userSlice,
  purposeSlice,
  settingsSlice,
  userBlockSlice,
  userProfileSlice,
  mapLocationSlice,
  notificationSlice,
  userLikeStackSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
