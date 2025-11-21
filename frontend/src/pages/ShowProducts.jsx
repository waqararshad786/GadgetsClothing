import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/all");
        setProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response) setError(err.response.data.message);
        else setError("Failed to fetch backend products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="w-[90%] sm:w-[85%] mx-auto py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Backend Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((item) => (
          <Link key={item._id} to={`/product/${item._id}`}>
            <div className="border border-gray-200 rounded-xl p-3 bg-white hover:shadow-md transition cursor-pointer">
              <img
                src={item.images?.[0] ? `http://localhost:5000${item.images[0]}` : "/placeholder.png"} // ✅ full URL
                alt={item.name}
                className="w-full h-44 sm:h-52 object-cover rounded-lg"
              />
              <h4 className="mt-3 text-sm sm:text-base font-medium text-gray-700 line-clamp-1">
                {item.name}
              </h4>
              <p className="text-gray-900 font-semibold mt-1">${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
