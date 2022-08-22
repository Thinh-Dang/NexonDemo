import { IResponse } from '@/@type/responses';
import { IUserBlock, IUserLikeStack } from '@/@type/services';
import userBlocksApi from '@/services/user-blocks.api';
import userLikeStacksApi from '@/services/user-like-stacks.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createUserBlock = createAsyncThunk(
  'createUserBlock',
  async (
    requestOption: IFormCreateUserBlock,
  ): Promise<IResponse<IUserBlock>> => {
    return await userBlocksApi.createUserBlock(requestOption);
  },
);
export const createUserLikeStack = createAsyncThunk(
  'createUserLikeStack',
  async (
    requestOption: IFormCreateUserLikeStack,
  ): Promise<IResponse<IUserLikeStack>> => {
    return await userLikeStacksApi.createUserLikeStack(requestOption);
  },
);
export const findingSlice = createSlice({
  name: 'finding',
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
    builder.addCase(
      // createUserLikeStack
      createUserLikeStack.fulfilled,
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
