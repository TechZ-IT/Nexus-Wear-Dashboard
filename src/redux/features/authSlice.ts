import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    user: any | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// 🔹 Admin Login Thunk
export const loginAdmin = createAsyncThunk(
    "auth/loginAdmin",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post(
                "https://nexus-wear-backend-production.up.railway.app/admin/login",
                { email, password }
            );
            return res.data; // { data, accessToken, message, status }
        } catch (err) {
            return rejectWithValue("Admin login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("auth");
        },
        loadUser: (state) => {
            const saved = localStorage.getItem("auth");
            if (saved) {
                const parsed = JSON.parse(saved);
                state.user = parsed.data;
                state.token = parsed.accessToken;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data; // Admin info
                state.token = action.payload.accessToken; // JWT token
                localStorage.setItem("auth", JSON.stringify(action.payload));
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
