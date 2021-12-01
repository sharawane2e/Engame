import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import CustomButton from "../widgets/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_FROM_CART,
  RESET_PASSWORD,
  RESET_PASSWORD_TOKEEN_VERIFY,
  VERIFICATION_EMAIL_TOKEN,
} from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import Toaster from "../../util/Toaster";
import emptyImg from "../../assets/images/oops.gif";
import sucessfullImg from "../../assets/images/sucessfull.svg";
import { parse } from "query-string";
import { useLocation } from "react-router";
import { logOutUser } from "../../redux/user/user-action";
import ApiRequest from "../../util/ApiRequest";
import { useHistory } from "react-router-dom";
import EmptyPage from "../emptyPage";
import { ErrorMessages } from "../../constants/Messages";
import SucessfullImg from "../../assets/images/sucessfull.svg";
import ErrorImg from "../../assets/images/error.svg";
import LocalStorageUtils from "../../util/LocalStorageUtils";

const EmailVerification = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [isNotValidToken, setIsNotValidToken] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const queryData = parse(location.search);

  const handelCheckToken = () => {
    let tokenData = {
      key: queryData.key,
    };

    ApiRequest.request(VERIFICATION_EMAIL_TOKEN, "POST", tokenData)
      .then((res) => {
        if (res.status) {
          setIsNotValidToken(false);
          setIsValidToken(true);
        } else {
          // setIsNotValidToken(true);
          // setIsValidToken(false);
          history.push("./");
          Toaster.error(res.detail.message, "topCenter");
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  useEffect(() => {
    dispatch(loadingStart());
    handelCheckToken();
  }, []);

  return (
    <>
      <Header />
      <div className="forgot">
        {isValidToken && !isNotValidToken ? (
          <EmptyPage
            heading={ErrorMessages.VERIFICATION_EMAIL_TOKEN_VALID}
            buttonName="Back to home"
            imgUrl={SucessfullImg}
          />
        ) : isNotValidToken && !isValidToken ? (
          <EmptyPage
            heading={ErrorMessages.VERIFICATION_EMAIL_TOKEN_NOT_VALID}
            buttonName="Back to home"
            imgUrl={ErrorImg}
          />
        ) : (
          ""
        )}
      </div>

      <Footer />
    </>
  );
};

export default EmailVerification;
