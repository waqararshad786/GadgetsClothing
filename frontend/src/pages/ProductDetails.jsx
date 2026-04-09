import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";
import { useCart } from "../context/CartContext";
import EmailForm from "../components/EmailForm";
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Truck, Shield, RotateCcw, Minus, Plus, Star } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [index, setIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/400x500?text=Product";
    return img.startsWith("http") ? img : img;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        const prod = res.data.product;
        setProduct(prod);

        if (prod.images && prod.images.length > 0) {
          setMainImage(prod.images[0]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(prev => prev + 1);
    } else if (type === "minus" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    alert("✅ Product added to cart!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Product not found</p>
        </div>
      </div>
    );
  }

  const imagesArray = product.images || [];

  const nextImage = () => {
    const newIndex = (index + 1) % imagesArray.length;
    setIndex(newIndex);
    setMainImage(imagesArray[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (index - 1 + imagesArray.length) % imagesArray.length;
    setIndex(newIndex);
    setMainImage(imagesArray[newIndex]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600 cursor-pointer">Collection</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left - Thumbnails */}
          {imagesArray.length > 0 && (
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] order-2 lg:order-1">
              {imagesArray.map((img, i) => (
                <div
                  key={i}
                  onClick={() => { setMainImage(img); setIndex(i); }}
                  className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    img === mainImage ? "border-blue-600 shadow-md" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={getImage(img)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Center - Main Image */}
          <div className="flex-1 relative bg-white rounded-2xl shadow-lg overflow-hidden order-1 lg:order-2">
            <div className="relative flex items-center justify-center p-4 min-h-[400px] md:min-h-[500px]">
              <img
                src={getImage(mainImage)}
                alt={product.name}
                className="max-w-full max-h-[500px] object-contain"
              />
              
              {/* Navigation Buttons */}
              {imagesArray.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            {imagesArray.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {index + 1} / {imagesArray.length}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="flex-1 order-3">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              
              {/* Wishlist Button */}
              <button 
                onClick={() => setIsWishlist(!isWishlist)}
                className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition"
              >
                <Heart size={24} fill={isWishlist ? "red" : "none"} className={isWishlist ? "text-red-500" : ""} />
              </button>

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 pr-8">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900">Rs{product.price}</p>
                {product.originalPrice && (
                  <p className="text-sm text-gray-400 line-through">Rs{product.originalPrice}</p>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description || "No description available."}
              </p>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold text-gray-800 mb-3">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-full border-2 font-medium transition-all ${
                          selectedSize === size 
                            ? "border-blue-600 bg-blue-50 text-blue-600" 
                            : "border-gray-300 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <p className="font-semibold text-gray-800 mb-3">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity("minus")}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => updateQuantity("plus")}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mb-4"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield size={18} className="text-green-600" />
                  <span>1 year warranty on all products</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RotateCcw size={18} className="text-orange-600" />
                  <span>14 days easy return policy</span>
                </div>
              </div>

              {/* Category Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
                <p>Category: <span className="text-gray-700">{product.category || "—"}</span></p>
                <p className="mt-1">Subcategory: <span className="text-gray-700">{product.subCategory || "—"}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailForm />
    </div>
  );
};

export default ProductDetails;