import React from "react";
import bracelet1 from "../assets/service_about_1.webp";
import bracelet2 from "../assets/service_about_2.webp";
import Slideshow from "../components/UI/Slideshow";
import IngTC from "../components/UI/imghome";
import ProductList from "../components/UI/productBestSL";
import sp1 from "../assets/sp1.webp";
import sp2 from "../assets/sp2.webp";
import sp3 from "../assets/sp3.webp";

const products = [
  { image: sp1, title: "N BIG CIRCLE GEM LAUREL", price: "590.000" },
  { image: sp2, title: "N DEER HORN", price: "490.000" },
  { image: sp3, title: "ANK MULTI BUBBLE HEART OVAL CHAIN", price: "450.000" },
];

const Section = ({ children, className }) => (
  <section className={className}>{children}</section>
);

const ImageTextBlock = () => (
  <Section className="flex flex-col md:flex-row justify-center items-center py-10 space-y-4 md:space-y-0 md:space-x-6">
    <div className="w-full md:w-1/2">
      <img
        src={bracelet1}
        alt="Bracelet"
        className="w-full h-auto object-cover"
      />
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-center">
      <img
        src={bracelet2}
        alt="Bracelet 2"
        className="w-full h-auto object-cover mb-4"
      />
      <h2 className="text-2xl font-bold text-center mb-4">
        Đeo trang sức là cách thể hiện bạn mà không cần một lời nói nào.
      </h2>
      <p className="text-center">
        Cuộc sống có bao lâu mà chần chờ, hãy cứ đeo trang sức như chưa từng
        được đeo nhé.
      </p>
    </div>
  </Section>
);

const QuoteSection = () => (
  <Section className="h-40 bg-black bg-opacity-20 flex items-center justify-center ">
    <h1 className="text-2xl font-bold text-center">
      "Đeo trang sức là cách để thể hiện bạn là ai... mà không nói một lời."
    </h1>
  </Section>
);

const BestsellerSection = () => (
  <Section>
    <div className="w-full border-t-2 border-[#6b4226] my-4"></div>
    <h1 className="text-[#6b4226] text-3xl font-bold text-center mb-5">
      Bestseller
    </h1>
  </Section>
);

const BlogSection = () => (
  <Section>
    <div className="w-full border-t-2 border-[#6b4226] my-4"></div>
    <h1 className="text-[#6b4226] text-3xl font-bold text-center mb-5">
      BLOG TIPS & HINT
    </h1>
  </Section>
);

const AboutSection = () => (
  <Section>
    <div className="w-full border-t-2 border-[#6b4226] my-4"></div>
    <h1 className="text-[#6b4226] text-3xl font-bold text-center mb-5">
      ABOUT
    </h1>
  </Section>
);

const FEEDBACKSection = () => (
  <Section>
    <div className="w-full border-t-2 border-[#6b4226] my-4"></div>
    <h1 className="text-[#6b4226] text-3xl font-bold text-center mb-5">
      KHÁCH HÀNG FEEDBACK
    </h1>
  </Section>
);

function App() {
  return (
    <div className="container mx-auto max-screen-lg">
      <ImageTextBlock />
      <QuoteSection />
      <Slideshow />
      <IngTC />
      <BestsellerSection />
      <ProductList products={products} />
      <BlogSection />
      <AboutSection />
      <FEEDBACKSection />
    </div>
  );
}

export default App;
