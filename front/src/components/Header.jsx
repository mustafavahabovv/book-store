import {Link} from 'react-router-dom';

const Header = () => (
    <header className="bg-gray-100 p-4 shadow">
        <nav className="flex justify-center space-x-4 text-lg font-medium">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <Link to="/cart" className="text-blue-600 hover:underline">Cart</Link>
            <Link to="/wishlist" className="text-blue-600 hover:underline">Wishlist</Link>
        </nav>
    </header>
);

export default Header;
