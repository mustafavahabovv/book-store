import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addItemToCart} from '../redux/slices/cartSlice';
import {addBookToWishlist} from '../redux/slices/wishlistSlice';
import axios from "../config/axios.js";
import {toast} from 'react-toastify';

const Home = () => {
    const [books, setBooks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/books')
            .then(res => setBooks(res.data))
            .catch(err => console.error('Error fetching books:', err));
    }, []);

    const handleAddToCart = (book) => {
        dispatch(addItemToCart({bookId: book._id, quantity: 1}));
        toast.success(`${book?._id || 'Item'} Add to cart successfully`);
    };

    const handleAddToWishlist = (bookId) => {
        dispatch(addBookToWishlist(bookId)).then(() => {
            toast.success('Book added to wishlist');
        }).catch(() => {
            toast.error('Failed to add to wishlist');
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {books.map(book => (
                    <div key={book._id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
                        <h4 className="text-xl font-semibold mb-2">{book.name}</h4>
                        <p className="text-gray-700">Author: {book.author}</p>
                        <p className="font-bold text-lg mb-3">${book.price}</p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleAddToCart(book)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => handleAddToWishlist(book._id)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer"
                            >
                                Wishlist
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
