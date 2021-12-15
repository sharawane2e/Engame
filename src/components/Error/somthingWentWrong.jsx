import React from "react";
import EmptyPage from "../emptyPage";
import emptyImg from "../../assets/images/oops.gif";
import { ErrorMessages } from "../../constants/Messages";

const SomthingWentWrong = () => {
  return (
    <>
      <EmptyPage
        heading={ErrorMessages.NetworkErrorMessage}
        imgUrl={emptyImg}
        buttonName="Try Again"
      />
    </>
  );
};

export default SomthingWentWrong;
