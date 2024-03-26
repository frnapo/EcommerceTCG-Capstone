import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import productSlice from "./slices/productSlice.js";

const rootReducer = combineReducers({
  auth: authSlice,
  prodotti: productSlice,
});

export default rootReducer;
