import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { CartProvider } from "./contexts/CartContext";

const Intro = lazy(() => import("./pages/intro/Intro"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/home/Home"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Category = lazy(() => import("./pages/category/Category"));
const Warranty = lazy(() => import("./pages/warranty/Warranty"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Bestseller = lazy(() => import("./pages/bestseller/Bestseller"));
const NewArrivals = lazy(() => import("./pages/bestseller/NewArrivals"));
const Sale = lazy(() => import("./pages/promotion/Sale"));
const ProductDetail = lazy(() => import("./components/product/ProductDetail"));
const LayoutHome = lazy(() => import("./layouts/LayoutHome"));
const Student = lazy(() => import("./pages/promotion/Student"));
const Accessories = lazy(() => import("./pages/accessories/Accessories"));

// Loading component
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "18px",
      color: "#0066cc",
      fontWeight: "600",
    }}
  >
    Đang tải...
  </div>
);

import "./App.scss";

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");
    if (redirect) {
      sessionStorage.removeItem("redirect");
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename="/">
        <RedirectHandler />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<LayoutHome />}>
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/category/:type" element={<Category />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/bestseller" element={<Bestseller />} />
              <Route path="/newarrivals" element={<NewArrivals />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/student" element={<Student />} />
              <Route path="/accessories/:type" element={<Accessories />} />
              <Route path="/product" element={<ProductDetail />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
