import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExpansionsByType = createAsyncThunk(
  "filters/fetchExpansionsByType",
  async (typeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7289/api/Products/expansions/byType?typeId=${typeId}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // console.log("Data received:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRaritiesByType = createAsyncThunk(
  "filters/fetchRaritiesByType",
  async (typeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7289/api/Products/rarities/byType?typeId=${typeId}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    expansions: [],
    rarities: [],
    grade: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpansionsByType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExpansionsByType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expansions = action.payload;
      })
      .addCase(fetchExpansionsByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchRaritiesByType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRaritiesByType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rarities = action.payload;
      })
      .addCase(fetchRaritiesByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default filtersSlice.reducer;
