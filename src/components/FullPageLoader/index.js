import React from "react";
import { connect } from "react-redux";
import loaderImg from "../../assets/images/loader.svg";
import Overlay from "../Overlay";

const FullPageLoader = ({ loading }) => {
  if (!loading) {
    return null;
  }
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

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
  };
};

export default connect(mapStateToProps, null)(FullPageLoader);
