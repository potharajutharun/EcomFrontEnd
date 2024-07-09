import { createSlice } from "@reduxjs/toolkit";

const initialState=[];
const whishListSlice=createSlice({
    name:"wishlist",
    initialState,
   reducers:{
    added(state,action){
        const itemExists = state.some(item => item.id === action.payload.id);
        if (!itemExists) {
            state.push(action.payload);
        } 
     },
     delete(state, action){
        return state.filter(item => item.id !== action.payload);
    }
   }

});
export const{added,delete:remove}=whishListSlice.actions
export default whishListSlice.reducer