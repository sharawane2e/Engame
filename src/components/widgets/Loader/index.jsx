import React from "react";
import puff from "../../../assets/images/puff.svg";
import "./Loader.scss";

function Loader(props) {
  let popupmessage = null;
  if (props.loaderText) {
    popupmessage = (
      <div className="pre-loader-textprop">{props.loaderText}</div>
    );
  }
  return (
    <div>
      <div className={"pre-loader-Block " + (props.show == true ? "show" : "")}>
        <img src={puff} width="50" alt="" />
      </div>
      {popupmessage}
    </div>
  );
}

export default Loader;
