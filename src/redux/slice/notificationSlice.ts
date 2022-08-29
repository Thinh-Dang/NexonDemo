import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationApi from '@/services/notification.api';

export const getNotification = createAsyncThunk(
  'secure/notifications',
  async () => {
    return await notificationApi.getNotificationByUserId();
  },
);

const initialState: IInitialStateNotification = {
  data: [],
  unreadNotice: 0,
  isNotification: false,
  content: '',
};

export const notificationSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotification.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.data = action.payload.data;

        let numberUnreadNotice = 0;
        action.payload.data.map((notification: any) => {
          if (!notification.isRead) {
            numberUnreadNotice++;
          }
        });

        state.unreadNotice = numberUnreadNotice;
      }
    });
  },
});

const { reducer, actions } = notificationSlice;
export const {} = actions;
export default reducer;
