import UserWishlistModel from "../models/userWishlistModel.js";

// Get wishlist items for a user
export const getWishlistItems = async (req, res) => {
    const userId = process.env.FIXED_USER_ID;  // Make sure to set this in your environment variables
    try {
        const wishlist = await UserWishlistModel.findOne({ userId }).populate("books");  // Populate the books field
        if (!wishlist) return res.status(404).json({ books: [] });  // If no wishlist found, return an empty array
        res.status(200).json(wishlist.books);  // Return the books array
    } catch (error) {
        res.status(500).json({ error: error.message });  // Handle errors
    }
};


// Add a book to wishlist
export const addToWishlist = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        let wishlist = await UserWishlistModel.findOne({ userId });

        if (!wishlist) {
            wishlist = new UserWishlistModel({ userId, books: [bookId] });
        } else if (!wishlist.books.includes(bookId)) {
            wishlist.books.push(bookId);
        }

        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit wishlist (replace all items)
export const editWishlist = async (req, res) => {
    const { userId, books } = req.body;
    try {
        const wishlist = await UserWishlistModel.findOneAndUpdate(
            { userId },
            { books },
            { new: true, upsert: true }
        );
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete one book from wishlist
export const removeFromWishlist = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const wishlist = await UserWishlistModel.findOne({ userId });
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        // Remove the specified book from the wishlist
        wishlist.books = wishlist.books.filter(id => id.toString() !== bookId);
        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Clear all items
export const clearWishlist = async (req, res) => {
    const { userId } = req.body;
    try {
        const wishlist = await UserWishlistModel.findOne({ userId });
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        wishlist.books = [];  // Clear the books array
        await wishlist.save();

        res.status(200).json({ message: "Wishlist cleared" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
