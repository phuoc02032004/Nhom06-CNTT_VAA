import React from "react";
import sp1 from "../../assets/sp1.webp";
import sp2 from "../../assets/sp2.webp";
import sp3 from "../../assets/sp3.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";

const IconButton = ({ icon }) => (
  <button className="shadow">
    <div
      className="bg-[#f9f9f9] p-2 rounded-lg relative flex justify-center items-center"
      style={{ transform: "rotate(45deg)" }}
    >
      <i
        className={`fas fa-${icon} text-[#6b4226]`}
        style={{ transform: "rotate(-45deg)" }}
      ></i>
    </div>
  </button>
);

const ProductCard = ({ image, title, price }) => (
  <div className="w-full max-w-xs mx-auto">
    <div className="relative">
      <img src={image} alt={title} className="w-full h-auto rounded-lg" />
      <div className="absolute bottom-2 left-2 flex space-x-2">
        <IconButton icon="heart" />
        <IconButton icon="shopping-bag" />
        <IconButton icon="search" />
      </div>
    </div>
    <div className="text-center mt-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500 text-xl font-bold">{price}₫</p>
    </div>
  </div>
);

const ProductList = () => {
  const products = [
    { image: sp1, title: "N BIG CIRCLE GEM LAUREL", price: "590.000" },
    { image: sp2, title: "N DEER HORN", price: "490.000" },
    {
      image: sp3,
      title: "ANK MULTI BUBBLE HEART OVAL CHAIN",
      price: "450.000",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
