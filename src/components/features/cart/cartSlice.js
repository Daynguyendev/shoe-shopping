import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartAPI from '../../API/cartAPI';

export const addItem = createAsyncThunk('cart/addItem', async (cart) => {
    const response = await cartAPI.add(cart);
    let cartUser = JSON.parse(localStorage.getItem('cartUser')) || [];
    cartUser.push({ cart })
    localStorage.setItem('cartUser', JSON.stringify(cart));
    return cart;
});

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartUser')) || [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    },
    extraReducers: {
        [addItem.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
        },


    },

})

export const { increment, decrement, incrementByAmount } = cartSlice.actions

export default cartSlice.reducer