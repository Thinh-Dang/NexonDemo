import {
  IFormCreateUserLikeStack,
  IFormDeleteUserLikeStack,
} from '@/@type/page';
import { IInitialStateUserLikeStack } from '@/@type/redux';
import { IResponse } from '@/@type/responses';
import { IUserLikeStack } from '@/@type/services';
import userLikeStacksApi from '@/services/userLikeStacks.api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: IInitialStateUserLikeStack = {
  matching: [],
};

export const createUserLikeStack = createAsyncThunk(
  'createUserLikeStack',
  async (
    requestOption: IFormCreateUserLikeStack,
  ): Promise<IResponse<IUserLikeStack>> => {
    return await userLikeStacksApi.createUserLikeStack(requestOption);
  },
);

export const getMatchingFriends = createAsyncThunk(
  'getMatchingFriends',
  async () => {
    return await userLikeStacksApi.getMatchingFriends();
  },
);

export const deleteUserLikeStacks = createAsyncThunk(
  'deleteUserLikeStacks',
  async (requestOption: IFormDeleteUserLikeStack) => {
    return await userLikeStacksApi.deleteUserLikeStacks(requestOption);
  },
);

export const findingSlice = createSlice({
  name: 'userLikeStackSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    builder.addCase(
      // getMatchingFriends
      getMatchingFriends.fulfilled,
      (state, action: any) => {
        if (action.payload.status) {
          const { data } = action.payload;
          state.matching = data;
        }
      },
    );
    builder.addCase(
      // deleteUserLikeStacks
      deleteUserLikeStacks.fulfilled,
      (state, action: any) => {},
    );
  },
});
const { reducer, actions } = findingSlice;
export const {} = actions;
export default reducer;
