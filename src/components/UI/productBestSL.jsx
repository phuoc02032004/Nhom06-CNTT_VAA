import React, { memo } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

const ProductCard = ({
  image,
  title,
  price,
  onAddToCart,
  onFavorite,
  onView,
}) => (
  <div className="w-full max-w-xs mx-auto">
    <div className="relative group">
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-auto rounded-lg transition-transform transform group-hover:scale-105"
      />

      {/* Icon Buttons (displayed over the image) */}
      <div className="absolute bottom-2 left-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <IconButton icon="heart" onClick={onFavorite} />
        <IconButton icon="shopping-bag" onClick={onAddToCart} />
        <IconButton icon="search" onClick={onView} />
      </div>
    </div>

    {/* Product Details */}
    <div className="text-center mt-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500 text-xl font-bold">{price}₫</p>
    </div>
  </div>
);

// ProductList Component (now accepts dynamic products as props)
const ProductList = ({ products }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {products.map((product, index) => (
      <ProductCard
        key={index}
        image={product.image}
        title={product.title}
        price={product.price}
        onAddToCart={() => alert(`Added ${product.title} to cart`)}
        onFavorite={() => alert(`Added ${product.title} to favorites`)}
        onView={() => alert(`Viewing ${product.title}`)}
      />
    ))}
  </div>
);

export default ProductList;
