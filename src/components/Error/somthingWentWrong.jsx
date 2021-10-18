import React, { useEffect } from "react";
import EmptyPage from "../emptyPage";
import emptyImg from "../../assets/images/oops.gif";
import { ErrorMessages } from "../../constants/Messages";
import { BASE_URL, LOGOUT } from "../../config/ApiUrl";
import { useHistory } from "react-router-dom";

const SomthingWentWrong = () => {
  const history = useHistory();

  //   useEffect(() => {
  //     fetch(BASE_URL).then(
  //       (response) => {
  //         history.push("/");
  //       },
  //       (err) => {
  //         history.push("/error");
  //       }
  //     );
  //   }, []);

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
