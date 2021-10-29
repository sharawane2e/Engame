import { Typography } from "@material-ui/core";
import React from "react";

const NoSearchFound = (props) => {
  return (
    <div className="noSearchFound">
      <img src={props.img} alt="No search found" />
      <Typography
        component="p"
        className="noSearchFound__headding"
        color="textPrimary "
      >
        {props.heading}
      </Typography>
    </div>
  );
};

export default NoSearchFound;
