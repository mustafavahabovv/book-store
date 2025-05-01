import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWishlistItems, removeBookFromWishlist } from '../redux/slices/wishlistSlice';  // Updated to match the action name
import { toast } from 'react-toastify';

const Wishlist = () => {
    const dispatch = useDispatch();
    const { items, status } = useSelector(state => state.wishlist);

    // Log items to console when they change
    useEffect(() => {
        console.log("Wishlist Items:", JSON.stringify(items, null, 2));
    }, [items]);  // Log whenever items changes

    useEffect(() => {
        dispatch(fetchWishlistItems());
    }, [dispatch]);

    const handleRemove = (bookId) => {
        dispatch(removeBookFromWishlist(bookId)).then(() => {
            toast.info('Removed from wishlist');
        });
    };

    if (status === 'loading') return <p>Loading wishlist...</p>;
    if (!items.length) return <p>Your wishlist is empty.</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            <ul className="space-y-4">
                {items.map(book => (
                    <li key={book._id} className="border p-4 rounded">
                        <h4>{book.name}</h4>
                        <p>Author: {book.author}</p>
                        <p>Price: ${book.price}</p>
                        <button
                            onClick={() => handleRemove(book._id)}
                            className="cursor-pointer text-red-600 hover:underline"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
