import mongoose from "mongoose";

const userCartSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
    books: [{
        bookId: {type: mongoose.Schema.Types.ObjectId, ref: "books"},
        quantity: {type: Number, default: 1}
    }]
});

const UserShoppingCartModel = mongoose.model('UserShoppingCart', userCartSchema)

export default UserShoppingCartModel