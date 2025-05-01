import express from 'express'
import {addToCart, clearCart, getCartItems, removeFromCart} from "../controllers/shoppingCartController.js";

const router = express.Router()

router
    .get("/", getCartItems)
    .post("/add", addToCart)
    .delete("/remove", removeFromCart)
    .delete("/clear", clearCart);

export default router