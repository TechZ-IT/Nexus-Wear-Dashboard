import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

interface AuthState {
    user: string | null;
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


// Login thunk
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post("https://nexus-wear-backend-production.up.railway.app/customer/login", {
                email,
                password,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue("Login failed");
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
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.token = action.payload.accessToken;
                localStorage.setItem("auth", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})



export const {logout,loadUser} = authSlice.actions


export default authSlice.reducer


