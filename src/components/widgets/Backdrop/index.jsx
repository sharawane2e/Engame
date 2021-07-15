import React from "react";
import "./Backdrop.scss";

function Backdrop(props) {
  return (
    <div className={"backdrop " + (props.show == true ? "show" : "")}></div>
  );
}

export default Backdrop;
