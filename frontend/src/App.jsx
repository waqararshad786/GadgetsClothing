import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

// Customer Pages (Main Frontend) - No Login Required
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ShowProducts from "./pages/ShowProducts.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import ReturnPolicy from "./components/ReturnPolicy.jsx";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Orders from "./pages/admin/Orders.jsx";
import OrderDetails from "./pages/admin/OrderDetails.jsx";
import Products from "./pages/admin/Products.jsx";
import AdminAddProduct from "./pages/admin/AdminAddProduct.jsx";

// Common Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// Protected route for admin only
const AdminRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      
      <Routes>
        {/* Admin Routes - No Navbar/Footer */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />
        <Route path="/admin/orders" element={
          <AdminRoute>
            <Orders />
          </AdminRoute>
        } />
        <Route path="/admin/orders/:id" element={
          <AdminRoute>
            <OrderDetails />
          </AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute>
            <Products />
          </AdminRoute>
        } />
        <Route path="/admin/products/add" element={
          <AdminRoute>
            <AdminAddProduct />
          </AdminRoute>
        } />
        <Route path="/admin/products/edit/:id" element={
          <AdminRoute>
            <AdminAddProduct />
          </AdminRoute>
        } />

        {/* Customer Routes - With Navbar/Footer (No Login Required) */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/collection" element={
          <>
            <Navbar />
            <Collection />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/product/:id" element={
          <>
            <Navbar />
            <ProductDetails />
            <Footer />
          </>
        } />
        <Route path="/cart" element={
          <>
            <Navbar />
            <CartPage />
            <Footer />
          </>
        } />
        <Route path="/order" element={
          <>
            <Navbar />
            <OrderPage />
            <Footer />
          </>
        } />
        <Route path="/payment" element={
          <>
            <Navbar />
            <PaymentPage />
            <Footer />
          </>
        } />
        <Route path="/show-products" element={
          <>
            <Navbar />
            <ShowProducts />
            <Footer />
          </>
        } />
        <Route path="/privacy-policy" element={
          <>
            <Navbar />
            <PrivacyPolicy />
            <Footer />
          </>
        } />
        <Route path="/return-policy" element={
          <>
            <Navbar />
            <ReturnPolicy />
            <Footer />
          </>
        } />
      </Routes>
    </CartProvider>
  );
}

export default App;