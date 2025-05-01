import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "../../config/axios.js";


const FIXED_USER_ID = import.meta.env.VITE_USER_ID;

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async () => {
        const response = await axios.get('/cart-items');
        const userCart = response.data.find(item => item.userId === FIXED_USER_ID);
        return userCart?.books || [];
    }
);


export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({bookId, quantity = 1}) => {
        const response = await axios.post('/cart-items/add', {
            userId: FIXED_USER_ID,
            bookId,
            quantity,
        });
        return response.data.books;
    }
);

// Remove item from cart
export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async ({bookId}) => {
        await axios.delete('/cart-items/remove', {
            data: {
                userId: FIXED_USER_ID,
                bookId,
            },
        });

        const response = await axios.get('/cart-items');
        const userCart = response.data.find(item => item.userId === FIXED_USER_ID);
        return userCart?.books || [];
    }
);


// Clear entire cart
export const clearUserCart = createAsyncThunk(
    'cart/clearUserCart',
    async () => {
        const response = await axios.delete('/cart-items/clear', {
            data: {userId: FIXED_USER_ID},
        });
        return response.data.books;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // { bookId, quantity }
        status: 'idle',
        error: null,
    },
    reducers: {
        // Optional: local-only cart logic
        addToCart: (state, action) => {
            const {bookId, quantity = 1} = action.payload;
            const existing = state.items.find(item => item.bookId === bookId);
            if (existing) {
                existing.quantity += quantity;
            } else {
                state.items.push({bookId, quantity});
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.bookId !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(clearUserCart.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
