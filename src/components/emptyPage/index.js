import React from "react";
import Typography from "@material-ui/core/Typography";
import CustomButton from "../widgets/Button";
import { useHistory } from "react-router-dom";

const EmptyPage = (props) => {
  const history = useHistory();

  const handelLink = () => {
    history.push("/");
  };
  return (
    <>
      <div className="emptyPage">
        <div className="emptyPage__headding">
          <Typography
            component="div"
            className="emptyPage__headding__para"
            color="textPrimary "
          >
            {props.heading}
          </Typography>
        </div>
        <div>
          <img src={props.imgUrl} className="emptyPage__img" alt="Empty cart" />
        </div>
        <div className="emptyPage__button">
          <CustomButton
            className="primary-button continueShoping"
            onClick={handelLink}
          >
            {props.buttonName}
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default EmptyPage;
