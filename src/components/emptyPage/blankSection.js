import React from "react";

const BlankSection = (props) => {
  const CustomStyle = {
    height: props.height ? props.height : "100vh",
  };
  return (
    <>
      <div className="blank" style={CustomStyle}></div>
    </>
  );
};

export default BlankSection;
