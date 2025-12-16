import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Intro from './pages/intro/Intro';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
// import Category from './pages/category/Category'
import LayoutHome from './layouts/LayoutHome';

import './App.scss';


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<LayoutHome />}>
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            {/* <Route path="category/:type" element={<Category />} />
            <Route path="product" element={<ProductDetail />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>

  );
}

export default App;

