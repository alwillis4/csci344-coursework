import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const MyCarousel = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      <div>
        <img
          src="https://picsum.photos/600/600?id=11"
          alt="Slide 1"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div>
        <img
          src="https://picsum.photos/600/600?id=12"
          alt="Slide 2"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div>
        <img
          src="https://picsum.photos/600/600?id=13"
          alt="Slide 3"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div>
        <img
          src="https://picsum.photos/600/600?id=14"
          alt="Slide 4"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </Carousel>
  );
};

export default MyCarousel;
