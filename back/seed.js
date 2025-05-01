import mongoose from "mongoose";
import dotenv from "dotenv";
import {faker} from "@faker-js/faker";
import BookModel from "./models/BookModel.js";
import UserModel from "./models/UserModel.js";
import bcrypt from "bcryptjs";
import UserWishlistModel from "./models/userWishlistModel.js";
import UserShoppingCartModel from "./models/userShoppingCartModel.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log("✅ Connected to MongoDB");

    await BookModel.deleteMany();
    await UserModel.deleteMany();
    await UserWishlistModel.deleteMany();
    await UserShoppingCartModel.deleteMany();

    const books = [];
    const users = [];
    const hashedPassword = await bcrypt.hash("password", 10);

    for (let i = 0; i < 100; i++) {
        books.push({
            name: faker.lorem.words(3),
            price: faker.commerce.price(),
            author: faker.person.fullName(),
        });
    }
    users.push({
        _id: process.env.FIXED_USER_ID,
        username: faker.lorem.words(1),
        password: hashedPassword,
    });
    await BookModel.insertMany(books);
    await UserModel.insertMany(users);

    console.log("📚 Fake books added!");
    process.exit();
}).catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
});
