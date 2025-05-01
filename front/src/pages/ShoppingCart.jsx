import {useDispatch, useSelector} from 'react-redux';
import {clearUserCart, fetchCartItems, removeItemFromCart} from '../redux/slices/cartSlice';
import {toast} from 'react-toastify';

import {useEffect} from "react";

const ShoppingCart = () => {
    const {items} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                Shopping Cart
                <button
                    onClick={() => {
                        dispatch(clearUserCart());
                        toast.success(`Cart Cleared Successfully!`);
                    }}
                    className="ml-2 cursor-pointer text-red-600 hover:underline"
                >
                    Clear All
                </button>
            </h2>

            {items.length === 0 ? <p>No items in cart.</p> : (
                <ul className="space-y-4">
                    {items.map(item => (
                        <li key={item.bookId._id} className="border p-4 rounded">
                            {/* Safe check to ensure item.book exists */}
                            <h4>{item.bookId ? item.bookId.name : 'Book not available'}</h4>
                            <p>Price: {item.bookId ? item.bookId.price : 'Book Price not available'}</p>
                            <p>Qty: {item.quantity}</p>
                            <button
                                onClick={() => {
                                    dispatch(removeItemFromCart({bookId: item.bookId._id}));
                                    toast.info(`${item.bookId?.name || 'Item'} removed from cart`);
                                }}
                                className="cursor-pointer text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
};

export default ShoppingCart;
