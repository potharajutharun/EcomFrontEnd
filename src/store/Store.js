import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice.js";
import productSlice from "./productSlice.js";
import wishlistSlice from "./wishlistSlice.js";
import authSlice from "./authSlice.js";
import menproductSlice from "./electronicSlice.js";
import homeSlice from "./homeSlice.js";
import menSlice from "./MenSlice.js";
import profileSlice from "./profileSlice.js";
import userDetailsSlice from "./userDetailsSlice.js";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    WishList: wishlistSlice,
    auth: authSlice,
    menProducts: menproductSlice,
    home: homeSlice,
    Women: wishlistSlice,
    Men: menSlice,
    profile: profileSlice,
    userDetails: userDetailsSlice,
  },
});

export default store;
