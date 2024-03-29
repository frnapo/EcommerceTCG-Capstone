import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchWithToken from "../wrapper";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await fetchWithToken(`https://localhost:7289/api/Wishlist/getwishlist/?userId=${userId}`, token);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Could not fetch wishlist");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId, token }, { rejectWithValue }) => {
    try {
      const response = await fetchWithToken(
        `https://localhost:7289/api/Wishlist/add/?userId=${userId}&productId=${productId}`,
        token,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Could not add product to wishlist");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Crea lo slice
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
