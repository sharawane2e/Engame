import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import librarycards from "../../assets/images/library-cards.svg";
import BrandTargetdnd from "../../assets/images/BrandTarget-dnd.svg";
import ExclusiveDnd from "../../assets/images/Container_exclusive_dnd.svg";

const CarouselBeforeLogin = () => {
  return (
    <>
      <Carousel
        autoPlay={10}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        width={250}
        className="homeBanner"
      >
        <img src={BrandTargetdnd} alt="First banner" />
        <img src={librarycards} alt="Second banner" />
        <img src={ExclusiveDnd} alt="Third banner" />
      </Carousel>
    </>
  );
};

export default CarouselBeforeLogin;
