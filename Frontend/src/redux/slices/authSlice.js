import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await fetch("https://localhost:7289/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    let data = await response.json();

    if (response.status === 200) {
      toast.success("Una mail di conferma è stata inviata al tuo indirizzo di posta elettronica");
      return { ...data };
    } else {
      toast.error(data.message);
    }
  } catch (e) {
    console.log("Error", e.response.data);
    toast.error(e.response?.data?.message || "Errore sconosciuto");
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch("https://localhost:7289/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let data = await response.json();

    if (response.ok) {
      // console.log("Data:", data);
      toast.success("Ciao, " + data.firstName);
      return data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error(error.response?.data?.message || "Errore sconosciuto");
    return rejectWithValue(error.toString());
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://localhost:7289/api/auth/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (response.ok) {
      toast.success("Sei stato disconesso");
      // console.log(data);
      return data;
    } else {
      toast.error(data.message);
      return rejectWithValue(data);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Errore sconosciuto");
    console.error("Error:", error);
    return rejectWithValue(error.toString());
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      // Gestione del login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.user = action.payload;
        state.token = action.payload.token;
        console.log(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message ? action.payload.message : "Login fallito";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
