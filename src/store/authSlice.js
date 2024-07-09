
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          console.error('Error response from server:', error.response.data);
          return rejectWithValue(error.response.data);
        } else {
          console.error('Network error:', error.message);
          return rejectWithValue({ message: 'Network error' });
        }
      }
    }
  );



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.customer;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;
