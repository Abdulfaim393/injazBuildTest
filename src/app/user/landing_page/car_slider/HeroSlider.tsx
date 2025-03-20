import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner_1 from "../../../../../public/banner-injaz-1.jpg";
import banner_2 from "../../../../../public/INJAZ SAUDI NATIONAL DAY 1.webp";
import banner_3 from "../../../../../public/saudi national day  2.webp";
import banner_4 from "../../../../../public/teacher1.webp";
import banner_5 from "../../../../../public/teacher2.webp";
import banner_6 from "../../../../../public/inajz price drop banner 06 06 2024 copy.webp";
import banner_7 from "../../../../../public/new inajz banner 16 05 copy.webp";
import banner_8 from "../../../../../public/new sunny inajz banner 16 05 copy.webp";
import banner_9 from "../../../../../public/injaz new banner.webp";

const CarouselComponent: React.FC = () => {
  const data = [
    { src: banner_1, alt: "banner-1" },
    { src: banner_2, alt: "banner-2" },
    { src: banner_3, alt: "banner-3" },
    { src: banner_4, alt: "banner-4" },
    { src: banner_5, alt: "banner-5" },
    { src: banner_6, alt: "banner-6" },
    { src: banner_7, alt: "banner-7" },
    { src: banner_8, alt: "banner-8" },
    { src: banner_9, alt: "banner-9" },
  ];

  return (
    <Carousel
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
      autoPlay={true}
      showArrows={true}
      showIndicators={false}
      interval={10000}
      transitionTime={3000}
    >
      {data.map((item, index) => (
        <Box key={index}>
          <Image
            src={item.src}
            alt={item.alt}
            loading="lazy"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
