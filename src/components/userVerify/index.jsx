import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CustomButton from "../../components/widgets/Button";
import Link from "@material-ui/core/Link";
import { LoginValidation } from "../../util/FormValidation";
// import { BASE_URL } from "../../config/ApiUrl";
import Registration from "../../components/Registration";
import Toaster from "../../util/Toaster";
import ForgotPassword from "../../components/ForgotPassword";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { connect } from "react-redux";
import { loginUser } from "../../redux/user/user-action";
import FilledInput from "@material-ui/core/FilledInput";
import ApiRequest from "../../util/ApiRequest";
import { SEND_VERIFICATION_EMAIL } from "../../config/ApiUrl";
import { Typography } from "@material-ui/core";
import sucessfullImg from "../../assets/images/sucessfull.svg";
import errorImg from "../../assets/images/error.svg";
import Login from "../Login/index";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessages } from "../../constants/Messages";
import LocalStorageUtils from "../../util/LocalStorageUtils";

const UserVerification = () => {
  const [isWantVerificationEmail, setIsWantVerificationEmail] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isWantLogin, setIsWantLogin] = useState(false);
  const [
    emailverificationMailSentMessage,
    setEmailverificationMailSentMessage,
  ] = useState("");
  const dispatch = useDispatch();

  const handelSendverificationEmail = () => {
    let data = {
      email: localStorage.getItem("verificationEmail"),
    };
    dispatch(loadingStart());
    ApiRequest.request(SEND_VERIFICATION_EMAIL, "POST", data)
      .then((res) => {
        if (res.status) {
          setIsWantVerificationEmail(true);
          setIsEmailSent(true);
        } else {
          setIsWantVerificationEmail(false);
          setIsEmailSent(false);
        }
        setEmailverificationMailSentMessage(res.detail.message);
        dispatch(loadingStop());
      })
      .finally(() => {
        LocalStorageUtils.setLocalStorage("remove", "verificationEmail");
      });
  };
  return (
    <div className="form-area login--form emailVerify">
      {isWantVerificationEmail && !isEmailSent ? (
        <div className="emailVerify__messageSection">
          <Typography component="p">
            Your email is not verified so please verify your email to login in
            the portal. Click below to send the email for verification.
          </Typography>
          <div className="form-button-grop">
            <CustomButton
              className="login__button primary-button"
              // onClick={() => setIsWantVerificationEmail(true)}
              onClick={handelSendverificationEmail}
            >
              Send verification email
            </CustomButton>
          </div>
        </div>
      ) : isWantVerificationEmail && isEmailSent && !isWantLogin ? (
        <div className="emptySection">
          <img src={sucessfullImg} />
          <Typography component="p">
            {emailverificationMailSentMessage}
          </Typography>
          <div className="form-button-grop emptySection__button-grop">
            <CustomButton
              className="login__button primary-button"
              onClick={() => setIsWantLogin(true)}
            >
              Back to Login
            </CustomButton>
          </div>
        </div>
      ) : isWantLogin ? (
        <Login />
      ) : (
        <div className="emptySection">
          <img src={errorImg} />
          <Typography component="p">
            {ErrorMessages.SOMETHING_WENT_WRONG}
          </Typography>
          <div className="form-button-grop">
            <CustomButton
              className="login__button primary-button"
              onClick={() => setIsWantLogin(true)}
            >
              Back to Login
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVerification;
