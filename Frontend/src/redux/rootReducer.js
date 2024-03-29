import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import productSlice from "./slices/productSlice.js";
import wishSlice from "./slices/wishSlice.js";

const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  wishlist: wishSlice,
});

export default rootReducer;
