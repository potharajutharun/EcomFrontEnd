import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMenProducts = createAsyncThunk(
  'menProducts/fetchMenProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.in/api/products'); 
    return response.data.products; 
  }
);

const menProductsSlice = createSlice({
  name: 'menProducts',
  initialState: {
    products: {
      data: [],
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenProducts.pending, (state) => {
        state.products.status = 'loading';
      })
      .addCase(fetchMenProducts.fulfilled, (state, action) => {
        state.products.status = 'succeeded';
        state.products.data = action.payload;
      })
      .addCase(fetchMenProducts.rejected, (state, action) => {
        state.products.status = 'failed';
        state.products.error = action.error.message;
      });
  },
});

export default menProductsSlice.reducer;
