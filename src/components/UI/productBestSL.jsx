import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AddtoCart } from "../../services/cart";
import noFound from "../../assets/nofound.jpg";

const IconButton = memo(({ icon, onClick }) => (
  <button
    className="shadow transition-transform transform hover:scale-110"
    onClick={onClick}
  >
    <div className="bg-[#f9f9f9] p-2 rounded-lg relative flex justify-center items-center rotate-45">
      <i className={`fas fa-${icon} text-[#6b4226] -rotate-45`}></i>
    </div>
  </button>
));

const ProductCard = ({ id, image, title, price, onAddToCart, onFavorite }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    try {
      id = id;
      navigate(`/ProductDetail/${id}`);
    } catch (error) {
      console.error("Error to get product detail:", error);
      alert("Failed to get product detail. Please try again.");
    }
  };

  const handleAddToCart = async () => {
    try {
      const userID = localStorage.getItem("userID");
      console.log(userID);
      await AddtoCart(userID, id, 1);
      alert(`Added ${title} to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative group">
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-lg transition-transform transform group-hover:scale-105 cursor-pointer"
          onClick={handleViewProduct}
        />
        <div className="absolute bottom-2 left-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <IconButton icon="heart" onClick={onFavorite} />
          <IconButton icon="shopping-bag" onClick={handleAddToCart} />
          <IconButton icon="search" onClick={handleViewProduct} />
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 text-xl font-bold">{price}</p>
      </div>
    </div>
  );
};

const ProductList = ({ products }) => {
  console.log(products); // In ra để kiểm tra

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard
            key={index}
            id={product._id}
            image={product.image}
            title={product.title}
            price={product.price}
            onAddToCart={() => alert(`Added ${product.id} to cart`)} // Sử dụng _id ở đây nếu cần
            onFavorite={() => alert(`Added ${product.title} to favorites`)}
          />
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center">
          <img
            src={noFound}
            alt="No products found"
            className="w-1/2 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
