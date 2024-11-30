import React, { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import ProductList from "../components/UI/productBestSL";
import PathName from "../components/UI/path";
import { useLocation } from "react-router-dom"; // Import useLocation để nhận state

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
  const location = useLocation();
  const { query, results } = location.state || { query: "", results: [] };

  useEffect(() => {
    const fetchProducts = async () => {
      if (results && results.length > 0) {
        const formattedResults = results.map((product) => ({
          _id: product._id,
          image: product.images[0]?.url,
          title: product.name,
          price: product.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }),
        }));
        setProducts(formattedResults);
      } else {
        if (products.length === 0) {
          try {
            const fetchedProducts = await getProducts();
            const formattedProducts = fetchedProducts.map((product) => ({
              _id: product._id,
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
        }
      }
    };

    fetchProducts();
  }, [results, products.length]);

  return (
    <div className="imgTop">
      <ImgTop />
      <div>
        <PathName
          paths={[
            { label: "Trang chủ", onClick: (navigate) => navigate("/") },
            { label: "Trang Sức", active: true },
          ]}
        />
      </div>
      <div className="px-5">
        {query && (
          <h2 className="text-2xl font-semibold mb-4">
            Kết quả tìm kiếm cho: "{query}"
          </h2>
        )}
        <ProductList products={products} />
      </div>
    </div>
  );
}

export default App;
