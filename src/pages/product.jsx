import React, { useEffect, useState } from "react";
import { getProducts } from "../services/products"; 
import ProductList from "../components/UI/productBestSL";
import PathName from "../components/UI/path";

const Section = ({ children, className, style }) => (
  <section className={className} style={style}>
    {children}
  </section>
);

const ImgTop = () => (
  <Section
    className="flex flex-col md:flex-row justify-center items-center py-10 space-y-4 md:space-y-0 md:space-x-6"
    style={{
      backgroundImage:
        "url('https://bizweb.dktcdn.net/100/302/551/collections/danen-untitled-1-08.jpg?v=1657274283870')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "300px",
    }}
  />
);

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        const formattedProducts = fetchedProducts.map((product) => ({
          _id:product._id,
          image: product.images[0]?.url,
          title: product.name,
          price: product.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }),
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="imgTop">
      <ImgTop />
      <PathName />
      <ProductList products={products} />
    </div>
  );
}

export default App;
