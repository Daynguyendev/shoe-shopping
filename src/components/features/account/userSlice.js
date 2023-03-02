import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: JSON.parse(localStorage.getItem('user'))?.isLogin || false,
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
