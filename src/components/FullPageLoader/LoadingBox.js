import React from "react";
import loaderImg from "../../assets/images/loader.svg";
import Overlay from "../Overlay";

const LoadingBox = () => {
  return (
    <>
      <Overlay />
      <div className="loader_main">
        <div className="loader">
          <img src={loaderImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default LoadingBox;
