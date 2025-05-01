import express from 'express';
import {
    addToWishlist,
    clearWishlist,
    editWishlist,
    getWishlistItems,
    removeFromWishlist
} from "../controllers/wishlistController.js";

const router = express.Router();

// Route to get wishlist items for a user
router.get('/', getWishlistItems);

// Route to add a book to the wishlist
router.post("/add", addToWishlist);

// Route to edit the wishlist (replace all books)
router.put("/edit", editWishlist);

// Route to remove a specific book from the wishlist
router.delete("/remove", removeFromWishlist);

// Route to clear the entire wishlist
router.delete("/clear", clearWishlist);  // Changed to DELETE for clarity, as it's a deletion operation.

export default router;
