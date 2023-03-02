import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartAPI from '../../API/cartAPI';
import StorageKeys from '../../const/StorageKeys';




export const addItem = createAsyncThunk('cart/addItem', async (payload) => {
    const response = await cartAPI.add(payload);
    return response.data;
});


const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // increment: (state, action) => {
        //     state.value += 2
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
    extraReducers: {
        [addItem.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
        },


    },

})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = cartSlice.actions

export default cartSlice.reducer