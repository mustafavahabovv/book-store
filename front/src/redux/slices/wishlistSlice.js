import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../config/axios.js";

const FIXED_USER_ID = import.meta.env.VITE_USER_ID;

// Fetch user's wishlist items
export const fetchWishlistItems = createAsyncThunk(
    'wishlist/fetchWishlistItems',
    async () => {
        try {
            // Fetch the wishlist items from the backend
            const response = await axios.get('/wishlist-items');  // Get wishlist items for the user

            // Ensure you get the wishlist object (which already contains full book details)
            const userWishlist = response.data;  // This should be an array of book objects

            // Directly return the books from the wishlist response
            return userWishlist || [];  // Return full book details or an empty array
        } catch (error) {
            // Handle any errors in fetching data
            console.error('Error fetching wishlist items:', error);
            return [];  // Return an empty array in case of an error
        }
    }
);

// Add book to wishlist (POST)
export const addBookToWishlist = createAsyncThunk(
    'wishlist/addBookToWishlist',
    async (bookId, { rejectWithValue }) => {
        try {
            await axios.post('/wishlist-items/add', {
                userId: FIXED_USER_ID,
                bookId
            });
            return bookId;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Remove book from wishlist (DELETE)
export const removeBookFromWishlist = createAsyncThunk(
    'wishlist/removeBookFromWishlist',
    async (bookId, { rejectWithValue }) => {
        try {
            await axios.delete('/wishlist-items/remove', {
                data: {
                    userId: FIXED_USER_ID,
                    bookId
                }
            });
            return bookId;  // Return the bookId to update the state in the reducer
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Clear entire wishlist (DELETE or PUT depending on backend)
export const clearWishlistItems = createAsyncThunk(
    'wishlist/clearWishlistItems',
    async (_, { rejectWithValue }) => {
        try {
            await axios.delete('/wishlist-items/clear', {
                data: { userId: FIXED_USER_ID }
            });
            return [];  // Return an empty array to clear the wishlist state
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch wishlist
            .addCase(fetchWishlistItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlistItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchWishlistItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Add book to wishlist
            .addCase(addBookToWishlist.fulfilled, (state, action) => {
                if (!state.items.find(item => item._id === action.payload)) {
                    state.items.push(action.payload);
                }
            })

            // Remove book from wishlist
            .addCase(removeBookFromWishlist.fulfilled, (state, action) => {
                // Remove the book from the state based on the action's payload
                state.items = state.items.filter(item => item._id !== action.payload);
            })

            // Clear entire wishlist
            .addCase(clearWishlistItems.fulfilled, (state) => {
                state.items = [];
            });
    }
});

export default wishlistSlice.reducer;
