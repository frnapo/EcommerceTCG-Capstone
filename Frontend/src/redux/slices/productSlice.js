import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProdByCategory = createAsyncThunk(
  "products/fetchProdByCategory",
  async (typeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7289/api/Products/bytype/${typeId}`); //aggiungere token come secondo parametro
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const products = await response.json();
      console.log(products);
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Le tue altre risposte di extraReducers vanno qui...
    builder
      .addCase(fetchProdByCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchProdByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        // Potresti voler resettare l'activeCardIndex ogni volta che carichi nuove carte
        state.activeCardIndex = 0;
      })
      .addCase(fetchProdByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { nextCard, prevCard, setActiveCardIndex } = productSlice.actions;

export default productSlice.reducer;
