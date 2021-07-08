import React from "react";
import Button from "@material-ui/core/Button";
import { getClassNames } from "../../../util/Utility";

const CustomButton = (props) => {
  return (
      <>
     <Button {...props}  
     className={getClassNames("custom-button", props.className)}
      >
      {props.children}
     </Button>
    </>
  );
};

export default CustomButton;
