import {Route, Routes} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import ShoppingCart from './pages/ShoppingCart';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="wishlist" element={<Wishlist/>}/>
                <Route path="cart" element={<ShoppingCart/>}/>
            </Route>
        </Routes>
    );
};

export default App;
