import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from './configs/config.js';
import BookRoutes from './routes/bookRoutes.js';
import ShoppingCartRoutes from './routes/shoppingCartRoutes.js';
import WishlistRoutes from './routes/wishlistRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: (origin, callback) => callback(null, origin),
        credentials: true,
    })
);

// API Routes
app.use('/books', BookRoutes);
app.use('/cart-items', ShoppingCartRoutes);
app.use('/wishlist-items', WishlistRoutes);

// Server start function
const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to start server:', err.message);
        process.exit(1);
    });
