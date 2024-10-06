import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "../../assets/slide_4.webp";
import slider2 from "../../assets/slide_5.jpg";
import slider3 from "../../assets/slide_6.webp";
import slider4 from "../../assets/slide_7.webp";
import slider5 from "../../assets/slide_8.webp";

const images = [slider1, slider2, slider3, slider4, slider5];

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300,
  };

  return (
    <div className="w-full h-96">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-96"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
