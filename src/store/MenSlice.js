import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  try {
    const response1 = await fetch('https://dummyjson.com/products/category/mens-watches');
    const response2 = await fetch('https://dummyjson.com/products/category/mens-shirts');
    const response3 = await fetch('https://dummyjson.com/products/category/mens-shoes');
    
    if (!response1.ok || !response2.ok || !response3.ok) {
      throw new Error('Failed to fetch products');
    }

    const data1 = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();

    const products = [
      ...data1.products,
      ...data2.products,
      ...data3.products
    ];

    return products;
  } catch (error) {
    throw error; 
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
