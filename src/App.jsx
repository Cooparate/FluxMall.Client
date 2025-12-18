import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CartProvider } from './contexts/CartContext';

// Lazy load components cho performance tốt hơn
const Intro = lazy(() => import('./pages/intro/Intro'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Home = lazy(() => import('./pages/home/Home'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const LayoutHome = lazy(() => import('./layouts/LayoutHome'));

// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#0066cc',
    fontWeight: '600'
  }}>
    ⚡ Đang tải...
  </div>
);

import './App.scss';


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<LayoutHome />}>
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              {/* <Route path="/category/:type" element={<Category />} />
              <Route path="/product" element={<ProductDetail />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>

  );
}

export default App;

