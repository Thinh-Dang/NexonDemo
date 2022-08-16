import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: IInitialStateMapLocation = {
  userPosition: { lat: 0, lng: 0 },
};

export const mapLocationSlice = createSlice({
  name: 'mapLocation',
  initialState: initialState,
  reducers: {
    updateUserPosition(state, action: PayloadAction<IInitialStateMapLocation>) {
      state.userPosition = action.payload.userPosition;
    },
  },
});
const { reducer, actions } = mapLocationSlice;
export const { updateUserPosition } = actions;
export default reducer;
