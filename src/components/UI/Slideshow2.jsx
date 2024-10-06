import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "../../assets/slider_1.webp";
import slider2 from "../../assets/slider_2.webp";
import slider3 from "../../assets/slider_3.webp";

const images = [slider1, slider2, slider3];

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
