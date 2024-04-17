import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchWithToken from "../wrapper";
import { toast } from "react-hot-toast";

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

export const toggleWishlistItem = createAsyncThunk(
  "wishlist/toggleWishlistItem",
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
      // console.log(data);
      toast.success(data.message);
      if (!response.ok) {
        throw new Error(data.message || "Si è verificato un errore");
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
      .addCase(toggleWishlistItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const product = action.payload;

        if (product.isInWishlist) {
          state.items = [...state.items, product];
        } else {
          state.items = state.items.filter((item) => item.productId !== product.productId);
        }
      })
      .addCase(toggleWishlistItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
