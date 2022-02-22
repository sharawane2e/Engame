import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HomeBanner1 from "../../assets/images/home-banner-1.png";

const CarouselAfterLogin = () => {
  var Carousel = require("react-responsive-carousel").Carousel;
  return (
    <div className="homeFullBanner">
      <Carousel showArrows={true}>
        <div>
          <img src={HomeBanner1} alt="First banner" />
          <div className="textArea">
            <p className="textArea__filter-text">
              Creative tools can generate
              <span className="textArea__filter-text__review-text">
                {` innovative `}
              </span>
              ideas, ignite the imagination inside you.
            </p>
          </div>
        </div>
        <div>
          <img src={HomeBanner1} alt="Second banner" />
          <div className="textArea">
            <p className="textArea__filter-text">
              Creative tools can generate
              <span className="textArea__filter-text__review-text">
               {` innovative `}
              </span>
              ideas, ignite the imagination inside you.
            </p>
          </div>
        </div>
        <div>
          <img src={HomeBanner1} alt="Third banner" />
          <div className="textArea">
            <p className="textArea__filter-text">
              Creative tools can generate
              <span className="textArea__filter-text__review-text">
               {` innovative `}
              </span>
              ideas, ignite the imagination inside you.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselAfterLogin;
