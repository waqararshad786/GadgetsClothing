import React, { useState, useEffect } from "react";
import axios from "axios";
import { products as assetProducts } from "../assets/assets";
import EmailForm from "../components/EmailForm";
import { Link } from "react-router-dom";

const Collection = () => {
  const [backendProducts, setBackendProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState("relevant");

  // Fetch backend products
  useEffect(() => {
    const fetchBackend = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/all");
        setBackendProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBackend();
  }, []);

  // Merge backend + assets
  const allProducts = [
    ...backendProducts,
    ...assetProducts
  ];

  // Filters + sorting
  useEffect(() => {
    let temp = [...allProducts];

    if (categoryFilter.length > 0) {
      temp = temp.filter((item) => categoryFilter.includes(item.category));
    }

    if (typeFilter.length > 0) {
      temp = temp.filter((item) => typeFilter.includes(item.subCategory));
    }

    if (sortOrder === "low-to-high") temp.sort((a, b) => a.price - b.price);
    else if (sortOrder === "high-to-low") temp.sort((a, b) => b.price - a.price);

    setFilteredProducts(temp);
  }, [categoryFilter, typeFilter, sortOrder, backendProducts]);

  const clearFilters = () => {
    setCategoryFilter([]);
    setTypeFilter([]);
    setSortOrder("relevant");
  };

  return (
    <div>
      <div className="w-[90%] sm:w-[85%] mx-auto py-10 flex flex-col lg:flex-row gap-10">
        
        {/* LEFT FILTER PANEL */}
        <div className="w-full lg:w-1/4 bg-gray-50 border border-gray-200 rounded-2xl p-5 h-fit">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Filters</h2>

          <div className="mt-5">
            <h4 className="text-base font-medium mb-2 text-gray-700">Categories</h4>
            <div className="space-y-2">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={cat}
                    checked={categoryFilter.includes(cat)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setCategoryFilter((prev) =>
                        checked ? [...prev, value] : prev.filter((i) => i !== value)
                      );
                    }}
                    className="accent-black w-4 h-4"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-base font-medium mb-2 text-gray-700">Types</h4>
            <div className="space-y-2">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={type}
                    checked={typeFilter.includes(type)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setTypeFilter((prev) =>
                        checked ? [...prev, value] : prev.filter((i) => i !== value)
                      );
                    }}
                    className="accent-black w-4 h-4"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="mt-8 w-full bg-black text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition"
          >
            Clear Filters
          </button>
        </div>

        {/* PRODUCT GRID */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              All <span className="text-gray-500">Collections</span>
            </h2>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((item) => (
              <Link to={`/product/${item._id}`} key={item._id}>
                <div className="border border-gray-200 rounded-xl p-3 bg-white hover:shadow-md transition cursor-pointer">
                  <img
                    src={
                      item.images?.[0]
                        ? `http://localhost:5000${item.images[0]}`
                        : item.image?.[0]
                    }
                    alt={item.name}
                    className="w-full h-44 sm:h-52 object-cover rounded-lg"
                  />

                  <h4 className="mt-3 text-sm sm:text-base font-medium text-gray-700 line-clamp-1">
                    {item.name}
                  </h4>

                  <p className="text-gray-900 font-semibold mt-1">
                    ${item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <EmailForm />
    </div>
  );
};

export default Collection;
