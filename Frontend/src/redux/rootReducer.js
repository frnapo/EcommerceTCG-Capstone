import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import productSlice from "./slices/productSlice.js";
import wishSlice from "./slices/wishSlice.js";
import filtersSlice from "./slices/filterSlice.js";

const rootReducer = combineReducers({
  filters: filtersSlice,
  auth: authSlice,
  product: productSlice,
  wishlist: wishSlice,
});

export default rootReducer;
