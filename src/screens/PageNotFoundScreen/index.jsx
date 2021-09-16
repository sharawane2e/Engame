import React from "react";
import Page404 from "../../assets/images/404-error.svg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

const PageNotFoundScreen = () => {
  return (
    <>
      <div class="wrapper">
        <div class="wrapper-innr">
          <div class="img-404">
            <img src={Page404} alt="" />
          </div>
        </div>
        <div class="back-btn">
          <button>
            <span class="back-btn-icon">
              <ArrowBackIcon />
            </span>
            <Link to="/" className="back-color">
              Back to home
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default PageNotFoundScreen;
