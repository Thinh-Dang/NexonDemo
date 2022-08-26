import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IResponse } from '@/@type/responses';
import { IFormCreateUserBlock } from '@/@type/page';

import { IUserBlock } from '@/@type/services';
import userBlocksApi from '@/services/user-blocks.api';

export const createUserBlock = createAsyncThunk(
  'createUserBlock',
  async (
    requestOption: IFormCreateUserBlock,
  ): Promise<IResponse<IUserBlock>> => {
    return await userBlocksApi.createUserBlock(requestOption);
  },
);

export const findingSlice = createSlice({
  name: 'userBlockSlice',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      // createUserBlock
      createUserBlock.fulfilled,
      (state, action: any) => {
        if (action.payload.status) {
          const { data } = action.payload;
          return data;
        }
      },
    );
  },
});
const { reducer, actions } = findingSlice;
export const {} = actions;
export default reducer;
