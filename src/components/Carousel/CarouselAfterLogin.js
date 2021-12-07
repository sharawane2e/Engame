import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import HomeBanner1 from "../../assets/images/home-banner-1.png";
import BrandTargetdnd from "../../assets/images/BrandTarget-dnd.svg";
import ExclusiveDnd from "../../assets/images/Container_exclusive_dnd.svg";

const CarouselAfterLogin = () => {
  var Carousel = require("react-responsive-carousel").Carousel;
  return (
    <div className="homeFullBanner">
      <Carousel
        showArrows={true}
        // onChange={onChange}
        // onClickItem={onClickItem}
        // onClickThumb={onClickThumb}
      >
        <div>
          <img src={HomeBanner1} />
          <div className="textArea">
            <p className="textArea__filter-text">
              Creative tools cab generate
              <span className="textArea__filter-text__review-text">
                {` innovative `}
              </span>
              ideas ignite the imagination inside you.
            </p>
          </div>
        </div>
        <div>
          <img src={HomeBanner1} />
          <div className="textArea">
            <p className="textArea__filter-text">
              Creative tools cab generate
              <span className="textArea__filter-text__review-text">
                innovative
              </span>
              ideas ignite the imagination inside you.
            </p>
          </div>
        </div>
        <div>
          <img src={HomeBanner1} />
          <div className="textArea">
            <p className="textArea__filter-text">
              Creative tools cab generate
              <span className="textArea__filter-text__review-text">
                innovative
              </span>
              ideas ignite the imagination inside you.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselAfterLogin;
