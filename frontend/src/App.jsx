import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ShowProducts from "./pages/ShowProducts.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import ReturnPolicy from "./components/ReturnPolicy.jsx";

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/show-products" element={<ShowProducts />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;
