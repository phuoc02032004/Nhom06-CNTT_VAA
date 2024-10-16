import React from "react";
import anh1 from "../../assets/anhtrangchu.webp";
import anh2 from "../../assets/anhtrangchu2.webp";
import anh3 from "../../assets/anhtrangchu3.webp";

const JewelryShowcase = () => {
  const images = [anh1, anh2, anh3];

  return (
    <div className="text-center p-8">
      {/* Phần chữ */}
      <h1 className="text-[#6b4226] text-3xl font-bold">
        TRANG SỨC BẠC THÀNH LẬP TỪ 2024
      </h1>
      <p className="text-[#6b4226] text-xl my-4">-- VÒNG VĨNH CỬU --</p>
      <p className="text-[#6b4226] text-lg font-semibold">
        PERMANENT JEWELRY <br />
        <a href=" http://192.168.100.243:3000" className="underline">
          "CLICK"
        </a>{" "}
        ĐỂ XEM CHI TIẾT
      </p>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {images.map((src, index) => (
          <div key={index} className="w-full h-full overflow-hidden rounded-lg">
            <img
              src={src}
              alt={`image-${index}`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JewelryShowcase;
