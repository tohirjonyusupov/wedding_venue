import React from "react";
import Slider from "react-slick";


const VenueImageCarousel = ({ images, venueName }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {images.map((img, i) => (
        <div key={i}>
          <img
            src={img}
            alt={`${venueName} - Image ${i + 1}`}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>
      ))}
    </Slider>
  );
};

export default VenueImageCarousel;