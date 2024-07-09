import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            const itemExists = state.some(item => item.id === action.payload.id);
            if (!itemExists) {
                state.push(action.payload);
            } 
        },
        delete(state, action){
            return state.filter(item => item.id !== action.payload);
        }
    },
});

export const { add, delete: remove } = cartSlice.actions;
export default cartSlice.reducer;