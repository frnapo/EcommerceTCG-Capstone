import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProdottiByCategoria = createAsyncThunk(
  "prodotti/fetchByCategoria",
  async (typeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7289/api/Products/bytype/${typeId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const prodotti = await response.json();
      console.log(prodotti);
      return prodotti;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "prodotti",
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProdottiByCategoria.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchProdottiByCategoria.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProdottiByCategoria.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default productSlice.reducer;
