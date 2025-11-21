import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import { useAuth } from "./context/AuthContext";
import Product from "./pages/Product";
import AdminAddProduct from "./pages/AdminAddProduct";


// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Routes>
    
      <Route path="/" element={<Login />} />

  
      <Route path="/dashboard" element={ <ProtectedRoute>  <Dashboard /> </ProtectedRoute> } />

      <Route path="/orders" element={ <ProtectedRoute>  <Orders /> </ProtectedRoute> }/>

     <Route path="/orders/:id" element={<ProtectedRoute> <OrderDetails /></ProtectedRoute>  }/>

     <Route path="/products" element={ <ProtectedRoute>  <Product/> </ProtectedRoute> }/>

     <Route path="/products/add" element={ <ProtectedRoute>  <AdminAddProduct/> </ProtectedRoute> }/>

     <Route path="/products/edit/:id"  element={ <ProtectedRoute>  <AdminAddProduct/> </ProtectedRoute> }/>


    </Routes>
  );
};

export default App;
