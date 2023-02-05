import settingsApi from '@/services/settings.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getRadius = createAsyncThunk('getRadius', async () => {
  // return await settingsApi.getRadius();
  return { data: { radius: 50 } };
});
export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState: { radius: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      // createUserBlock
      getRadius.fulfilled,
      (state, action: any) => {
        // if (action.payload.status) {
        //   const { data } = action.payload;
        //   state.radius = data.radius;
        // }
        const { data } = action.payload;
        state.radius = data.radius;
      },
    );
  },
});
const { reducer, actions } = settingsSlice;
export const {} = actions;
export default reducer;
