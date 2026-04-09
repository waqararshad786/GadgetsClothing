import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const API_URL = "http://localhost:5000/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/products/all`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/products/delete/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Topbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading products...</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        
        <div className="flex-1 overflow-auto p-4">
          {/* Header */}
          <div className="mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-800">Products</h1>
                <p className="text-gray-500 text-sm">Manage your product inventory</p>
              </div>
              <Link
                to="/products/add"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-lg shadow hover:shadow-lg transition-all flex items-center gap-1 text-sm"
              >
                <span>➕</span> Add Product
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-3 mb-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                  <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-56">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <button
                onClick={fetchProducts}
                className="px-3 py-1.5 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition flex items-center gap-1"
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          {/* Products Table */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="text-4xl mb-3">📦</div>
              <p className="text-gray-500 text-sm">No products found</p>
              {(searchTerm || categoryFilter !== "all") && (
                <button 
                  onClick={() => { setSearchTerm(""); setCategoryFilter("all"); }}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Image</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Sizes</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Category</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Bestseller</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <img
                            src={product.images?.[0] || "https://via.placeholder.com/50"}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                         </td>
                        <td className="px-3 py-2">
                          <span className="font-medium text-gray-800 text-sm">{product.name}</span>
                         </td>
                        <td className="px-3 py-2">
                          <span className="font-semibold text-gray-900 text-sm">Rs{product.price}</span>
                         </td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-1">
                            {product.sizes?.map((size, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{size}</span>
                            )) || "-"}
                          </div>
                         </td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{product.category || "-"}</span>
                         </td>
                        <td className="px-3 py-2">
                          {product.bestseller ? (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">⭐ Yes</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">No</span>
                          )}
                         </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1.5">
                            <Link
                              to={`/products/edit/${product._id}`}
                              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                         </td>
                       </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Table Footer */}
              <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>Showing {filteredProducts.length} of {products.length} products</span>
                  <button onClick={fetchProducts} className="text-blue-600 hover:text-blue-700 text-xs">
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;