import UserShoppingCartModel from "../models/userShoppingCartModel.js";
const FIXED_USER_ID = process.env.FIXED_USER_ID;
// Get all cart items (already done)
export const getCartItems = async (req, res) => {
    const cartItems = await UserShoppingCartModel.find({ userId: FIXED_USER_ID })
        .populate('books.bookId');
    res.json(cartItems);
};

// Add or update item in cart
export const addToCart = async (req, res) => {
    const { userId, bookId, quantity = 1 } = req.body;

    let userCart = await UserShoppingCartModel.findOne({ userId });

    if (!userCart) {
        // Create new cart
        userCart = new UserShoppingCartModel({
            userId,
            books: [{ bookId, quantity }],
        });
    } else {
        // Update existing cart
        const existingBook = userCart.books.find(b => b.bookId.toString() === bookId);
        if (existingBook) {
            existingBook.quantity += quantity;
        } else {
            userCart.books.push({ bookId, quantity });
        }
    }

    await userCart.save();
    res.json(userCart);
};

// Remove specific book from cart
export const removeFromCart = async (req, res) => {
    const { userId, bookId } = req.body;

    const userCart = await UserShoppingCartModel.findOne({ userId });
    if (userCart) {
        userCart.books = userCart.books.filter(b => b.bookId.toString() !== bookId);
        await userCart.save();
        res.json(userCart);
    } else {
        res.status(404).json({ message: "Cart not found" });
    }
};

// Clear all cart items
export const clearCart = async (req, res) => {
    const { userId } = req.body;
    const userCart = await UserShoppingCartModel.findOne({ userId });
    if (userCart) {
        userCart.books = [];
        await userCart.save();
        res.json(userCart);
    } else {
        res.status(404).json({ message: "Cart not found" });
    }
};
