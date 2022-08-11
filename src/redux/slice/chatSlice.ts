import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import userApi from '../../services/userApi';

const initialState: IInitialStateChat = {
  loading: false,
  error: '',
  conversations: [],
  messages: [],
  loaded: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    sendMessageSuccess(state, action: PayloadAction<IMessage>) {
      console.log(action);
    },

    sendMessage(state, action: PayloadAction<IMessage>) {
      console.log(action);
    },
  },
  extraReducers: (builder) => {},
});

const { reducer, actions } = chatSlice;
export const {} = actions;
export default reducer;
