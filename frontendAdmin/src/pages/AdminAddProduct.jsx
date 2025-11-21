// AdminAddProducts.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

const API_URL = "http://localhost:5000/api";

const AdminAddProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Agar edit ho raha hai toh id milegi
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestseller: false,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Agar edit mode hai, existing product fetch karo
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/products/${id}`)
        .then((res) => {
          const product = res.data.product;
          setFormData({
            name: product.name || "",
            price: product.price || "",
            description: product.description || "",
            category: product.category || "",
            subCategory: product.subCategory || "",
            sizes: product.sizes || [],
            bestseller: product.bestseller || false,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let updatedSizes = [...formData.sizes];
    if (checked) updatedSizes.push(value);
    else updatedSizes = updatedSizes.filter((s) => s !== value);
    setFormData((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const handleImages = (e) => setImages([...e.target.files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("subCategory", formData.subCategory);
    data.append("bestseller", formData.bestseller);
    data.append("sizes", JSON.stringify(formData.sizes));
    images.forEach((img) => data.append("images", img));

    try {
      if (id) {
        await axios.put(`${API_URL}/products/update/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product Updated Successfully!");
      } else {
        await axios.post(`${API_URL}/products/create`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product Added Successfully!");
      }
      setLoading(false);
      navigate("/products");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error saving product!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            {id ? "Edit Product" : "Add New Product"}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border"
          >
            {/* Name */}
            <div>
              <label className="font-semibold mb-1 block text-sm sm:text-base">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                className="border p-2 sm:p-3 rounded-lg w-full focus:ring focus:ring-blue-200 outline-none text-sm sm:text-base"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="font-semibold mb-1 block text-sm sm:text-base">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="border p-2 sm:p-3 rounded-lg w-full focus:ring focus:ring-blue-200 outline-none text-sm sm:text-base"
                onChange={handleChange}
                value={formData.price}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-semibold mb-1 block text-sm sm:text-base">Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Clothing, Shoes"
                className="border p-2 sm:p-3 rounded-lg w-full focus:ring focus:ring-blue-200 outline-none text-sm sm:text-base"
                onChange={handleChange}
                value={formData.category}
                required
              />
            </div>

            {/* Subcategory */}
            <div>
              <label className="font-semibold mb-1 block text-sm sm:text-base">Subcategory</label>
              <input
                type="text"
                name="subCategory"
                placeholder="e.g. Men, Women"
                className="border p-2 sm:p-3 rounded-lg w-full focus:ring focus:ring-blue-200 outline-none text-sm sm:text-base"
                onChange={handleChange}
                value={formData.subCategory}
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-1 sm:col-span-2">
              <label className="font-semibold mb-1 block text-sm sm:text-base">Description</label>
              <textarea
                name="description"
                placeholder="Write product description..."
                className="border p-2 sm:p-3 rounded-lg w-full focus:ring focus:ring-blue-200 outline-none text-sm sm:text-base"
                rows="4"
                onChange={handleChange}
                value={formData.description}
                required
              />
            </div>

            {/* Sizes */}
            <div className="col-span-1 sm:col-span-2">
              <p className="font-semibold mb-2 text-sm sm:text-base">Available Sizes</p>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <label
                    key={size}
                    className="flex items-center gap-2 bg-gray-100 px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition text-sm sm:text-base"
                  >
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.sizes.includes(size)}
                      onChange={handleSizeChange}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* Bestseller */}
            <div className="col-span-1 sm:col-span-2 flex items-center gap-2 sm:gap-3">
              <input
                type="checkbox"
                checked={formData.bestseller}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bestseller: e.target.checked }))
                }
              />
              <span className="font-medium text-sm sm:text-base">Mark as Bestseller</span>
            </div>

            {/* Images */}
            <div className="col-span-1 sm:col-span-2">
              <p className="font-semibold mb-2 text-sm sm:text-base">Upload Images (max 5)</p>
              <input
                type="file"
                multiple
                onChange={handleImages}
                className="border p-2 sm:p-3 rounded-lg w-full bg-white text-sm sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`col-span-1 sm:col-span-2 bg-blue-600 text-white font-semibold p-2 sm:p-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (id ? "Updating Product..." : "Adding Product...") : id ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProducts;
