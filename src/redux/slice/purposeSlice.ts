import { IPurpose } from '@/@type/params';
import { IResponse } from '@/@type/responses';
import PurposeApi from '@/services/purpose.api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getPurposes = createAsyncThunk('/purposes', async () => {
  return await PurposeApi.getPurposes();
});

const initialState: IPurpose[] = [];

export const purposeSlice = createSlice({
  name: 'purposeSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getPurposes.fulfilled,
      (
        state: IPurpose[],
        action: PayloadAction<IResponse<string | IPurpose[]>>,
      ) => {
        if (action.payload.status) {
          const res = action.payload.data as IPurpose[];
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            state.push(res[i]);
          }
        }
      },
    );
  },
  reducers: {},
});

const { reducer, actions } = purposeSlice;
export const {} = actions;
export default reducer;
