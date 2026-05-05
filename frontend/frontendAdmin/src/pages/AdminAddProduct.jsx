import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

const API_URL = "http://localhost:5000/api";

const AdminAddProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

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
          if (product.images) {
            setImagePreviews(product.images);
          }
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

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

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
        await axios.put(`${API_URL}/products/update/${id}`, data);
        alert("✅ Product Updated Successfully!");
      } else {
        await axios.post(`${API_URL}/products/create`, data);
        alert("✅ Product Added Successfully!");
      }
      setLoading(false);
      navigate("/products");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("❌ Error saving product!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-3xl mx-auto">
            
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📦</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">
                  {id ? "Edit Product" : "Add New Product"}
                </h1>
              </div>
              <p className="text-gray-500 text-sm ml-10">
                {id ? "Update product information" : "Fill in the details to add a new product"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 space-y-4">
                
                {/* Basic Info Section */}
                <div className="border-b border-gray-200 pb-3">
                  <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1">
                    <span>📝</span> Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">Rs</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Subcategory <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        placeholder="e.g., Casual, Formal, Sports"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="border-b border-gray-200 pb-3">
                  <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                    <span>📄</span> Description
                  </h2>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description..."
                    rows="3"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    required
                  />
                </div>

                {/* Sizes Section */}
                <div className="border-b border-gray-200 pb-3">
                  <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                    <span>👕</span> Available Sizes
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                      <label key={size} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          value={size}
                          checked={formData.sizes.includes(size)}
                          onChange={handleSizeChange}
                          className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bestseller Section */}
                <div className="border-b border-gray-200 pb-3">
                  <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                    <span>⭐</span> Product Status
                  </h2>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.bestseller}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bestseller: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-500"
                    />
                    <span className="text-sm text-gray-700">Mark as Bestseller</span>
                  </label>
                </div>

                {/* Images Section */}
                <div className="pb-2">
                  <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                    <span>🖼️</span> Product Images
                  </h2>
                  <div className="mb-3">
                    <label className="block w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition cursor-pointer text-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleImages}
                        className="hidden"
                        accept="image/*"
                      />
                      <div className="text-center">
                        <span className="text-2xl mb-1 block">📸</span>
                        <p className="text-xs text-gray-600">Click or drag images to upload</p>
                        <p className="text-xs text-gray-400 mt-0.5">You can select multiple images</p>
                      </div>
                    </label>
                  </div>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-gray-700 mb-1">Image Previews:</p>
                      <div className="flex flex-wrap gap-2">
                        {imagePreviews.map((preview, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${idx + 1}`}
                              className="w-14 h-14 object-cover rounded border border-gray-200"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-md transition-all disabled:opacity-50 text-sm"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {id ? "Updating..." : "Adding..."}
                      </div>
                    ) : (
                      <span>{id ? "Update Product" : "Add Product"}</span>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProducts;