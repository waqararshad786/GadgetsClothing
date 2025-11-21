import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const API_URL = "http://localhost:5000/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/all`)
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/products/delete/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) return <p className="p-6 text-xl">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 bg-gray-50">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products</h1>
            <Link
              to="/products/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full md:w-auto text-center"
            >
              + Add Product
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200 text-sm md:text-base">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="hidden md:table-row">
                  <th className="p-2 md:p-3 text-center">Image</th>
                  <th className="p-2 md:p-3 text-center">Name</th>
                  <th className="p-2 md:p-3 text-center">Price</th>
                  <th className="p-2 md:p-3 text-center">Sizes</th>
                  <th className="p-2 md:p-3 text-center">Category</th>
                  <th className="p-2 md:p-3 text-center">Subcategory</th>
                  <th className="p-2 md:p-3 text-center">Bestseller</th>
                  <th className="p-2 md:p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr
                    key={p._id}
                    className="block md:table-row mb-4 md:mb-0 border rounded-lg md:rounded-none shadow md:shadow-none p-4 md:p-0"
                  >
                    <td className="block md:table-cell p-2 md:p-3 text-center">
                      <span className="font-semibold md:hidden">Image: </span>
                      <img
                        src={p.images?.[0] ? `http://localhost:5000${p.images[0]}` : "/placeholder.png"}
                        alt={p.name}
                        className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-md mx-auto"
                      />
                    </td>
                    <td className="block md:table-cell p-2 md:p-3 text-center">
                      <span className="font-semibold md:hidden">Name: </span>{p.name}
                    </td>
                    <td className="block md:table-cell p-2 md:p-3 text-center">
                      <span className="font-semibold md:hidden">Price: </span>₹{p.price}
                    </td>
                    <td className="block md:table-cell p-2 md:p-3 text-center">
                      <span className="font-semibold md:hidden">Sizes: </span>{p.sizes?.join(", ") || "-"}
                    </td>
                    <td className="block md:table-cell p-2 md:p-3 text-center">
                      <span className="font-semibold md:hidden">Category: </span>{p.category || "-"}
                    </td>
                    <td className="block md:table-cell p-2 md:p-3 text-center">
                      <span className="font-semibold md:hidden">Subcategory: </span>{p.subCategory || "-"}
                    </td>
                    <td className="block md:table-cell p-2 md:p-3 text-center">
                      <span className="font-semibold md:hidden">Bestseller: </span>
                      {p.bestseller ? (
                        <span className="text-green-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </td>
                    <td className="block md:table-cell p-2 md:p-3 text-center">
                      <div className="flex flex-col md:flex-row gap-2 md:gap-1 justify-center">
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="px-2 md:px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto"
                        >
                          Delete
                        </button>
<Link
  to={`/products/edit/${p._id}`}
  className="px-2 md:px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto text-center"
>
  Edit
</Link>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
