import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products as assetProducts } from "../assets/assets";
import { useCart } from "../context/CartContext";
import EmailForm from "../components/EmailForm";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [index, setIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const prod = assetProducts.find((p) => p._id === id);
    if (prod) {
      setProduct(prod);
      if (prod.image && prod.image.length > 0) setMainImage(prod.image[0]);
    }
  }, [id]);

  if (!product) return <p className="text-center py-10">Product not found</p>;

  const imagesArray = product.image;

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

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    alert("Product added to cart!");
  };

  return (
    <div>
      <div className="w-[90%] sm:w-[85%] lg:w-[82%] mx-auto my-10 flex flex-col lg:flex-row gap-8 lg:gap-10">
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] order-2 lg:order-1">
          {imagesArray?.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => { setMainImage(img); setIndex(i); }}
              alt=""
              className={`w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer border ${
                img === mainImage ? "border-black" : "border-gray-300"
              } flex-shrink-0`}
            />
          ))}
        </div>

        <div className="flex-1 relative flex justify-center items-center order-1 lg:order-2">
          <img
            src={mainImage}
            alt={product.name}
            className="rounded-xl w-full max-h-[500px] sm:max-h-[600px] object-contain bg-white"
          />
          <button onClick={prevImage} className="absolute left-2 sm:left-4 bg-white/80 p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-200 transition">❮</button>
          <button onClick={nextImage} className="absolute right-2 sm:right-4 bg-white/80 p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-200 transition">❯</button>
        </div>

        <div className="flex-1 flex flex-col justify-center order-3 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-lg sm:text-xl font-bold mb-4 text-gray-900">₹{product.price}</p>
          <p className="text-gray-700 text-sm sm:text-base mb-6">{product.description || "No description available."}</p>

          <div className="flex gap-2 mb-4 justify-center lg:justify-start">
            {product.sizes?.map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-black text-white" : "bg-white"}`}>
                {size}
              </button>
            ))}
          </div>

          <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-16 border p-1 rounded mb-4"/>

          <button onClick={handleAddToCart} className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition w-full sm:w-auto mx-auto lg:mx-0 mb-3">Add to Cart</button>

          <div className="text-sm text-gray-500 mt-4">
            <p>Category: {product.category || "—"}</p>
            <p>Subcategory: {product.subCategory || "—"}</p>
          </div>
        </div>
      </div>
      <EmailForm />
    </div>
  );
};

export default ProductDetails;