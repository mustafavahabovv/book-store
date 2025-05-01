import mongoose from "mongoose";

const userWishlistSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
    books: [{type: mongoose.Schema.Types.ObjectId, ref: "books"}]
});

const UserWishlistModel = mongoose.model('UserWishlist', userWishlistSchema)

export default UserWishlistModel