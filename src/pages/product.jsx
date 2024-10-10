import React from "react";
import sp1 from "../assets/sp1.webp";
import sp2 from "../assets/sp2.webp";
import sp3 from "../assets/sp3.webp";
import ProductList from "../components/UI/productBestSL";
import PathName from "../components/UI/path";

const products = [
  { image: sp1, title: "N BIG CIRCLE GEM LAUREL", price: "590.000" },
  { image: sp2, title: "N DEER HORN", price: "490.000" },
  { image: sp3, title: "ANK MULTI BUBBLE HEART OVAL CHAIN", price: "450.000" },
];

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
  return (
    <div className="imgTop">
      <ImgTop />
      <PathName /> {/* Corrected the component name */}
      <ProductList products={products} />
    </div>
  );
}

export default App;
