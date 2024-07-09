import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrder } = profileSlice.actions;
export default profileSlice.reducer;
