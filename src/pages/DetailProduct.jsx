import React, { useEffect, useState } from "react";
import PathName from "../components/UI/path";
import ProductCard from "../components/UI/detail";
import { useParams } from "react-router-dom";
import { getProductId } from "../services/products";

function App() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductId(id);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div>
      <PathName
        paths={[
          { label: "Trang chủ", onClick: (navigate) => navigate("/") },
          { label: "Trang Sức", onClick: (navigate) => navigate("/product") },
          { label: product?.name, active: true },
        ]}
      />
      <ProductCard />
    </div>
  );
}

export default App;
