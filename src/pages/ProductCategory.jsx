import React, { useEffect, useState } from "react";
import ProductList from "../components/UI/productBestSL";
import PathName from "../components/UI/path";
import { getProductCategory } from "../services/products";
import { getCategoryById } from "../services/category"; // API mới
import { useParams } from "react-router-dom";

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
  const [category, setCategory] = useState(null); // Thêm state để lưu thông tin category
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductCategory(id);
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
    };

    const fetchCategory = async () => {
      try {
        const categoryData = await getCategoryById(id); // Gọi API để lấy thông tin category
        setCategory(categoryData);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchProducts();
    fetchCategory(); // Gọi thêm API để lấy thông tin category
  }, [id]);

  return (
    <div className="imgTop">
      <ImgTop />
      <div>
        <PathName
          paths={[
            { label: "Trang chủ", onClick: (navigate) => navigate("/") },
            {
              label: "Trang Sức",
              onClick: (navigate) => navigate("/product"),
            },
            {
              label: category?.name,
              active: true,
            },
          ]}
        />
      </div>
      <ProductList products={products} />
    </div>
  );
}

export default App;
