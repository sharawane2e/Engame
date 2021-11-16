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
import { LOGIN, SEND_VERIFICATION_EMAIL } from "../../config/ApiUrl";
import { Typography } from "@material-ui/core";
// import LocalStorageUtils from "../../util/LocalStorageUtils";
import sucessfullImg from "../../assets/images/sucessfull.svg";
import errorImg from "../../assets/images/error.svg";
import Login from "../Login";
import { useDispatch, useSelector } from "react-redux";

const UserVerification = () => {
  const [isWantVerificationEmail, setIsWantVerificationEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const dispatch = useDispatch();

  const getEmail = (e) => {
    // console.log(e.target.value);
    setEmailValue(e.target.value);
  };

  const handelSendverificationEmail = () => {
    let data = {
      email: emailValue,
    };
    dispatch(loadingStart());
    ApiRequest.request(SEND_VERIFICATION_EMAIL, "POST", data).then((res) => {
      console.log(res, "resend email");

      if (res.status) {
        setIsWantVerificationEmail(false);
        setIsEmailSent(true);
      } else {
        Toaster.error(res.detail.message, "topCenter");
      }
      dispatch(loadingStop());
    });
  };
  return (
    <div className="form-area login--form emailVerify">
      {!isWantVerificationEmail && !isEmailSent ? (
        <div className="emailVerify__messageSection">
          <Typography component="p">
            Your email is not verified so please verify your email to login in
            the portal. Click below to send the email for verification.
          </Typography>
          <div className="form-button-grop">
            <CustomButton
              className="login__button primary-button"
              onClick={() => setIsWantVerificationEmail(true)}
            >
              Send verification email
            </CustomButton>
          </div>
        </div>
      ) : isWantVerificationEmail && !isEmailSent ? (
        <div className="emailverify__verificationSection">
          <div className="form-area__login  large-hedding">
            Verify Your Email
          </div>
          <form className="form-area__fileds" noValidate autoComplete="off">
            {/* <InputLabel
                htmlFor="standard-adornment-email"
                className="input-label"
              >
                E-mail address
              </InputLabel> */}
            <FormControl className="form-area__control">
              <TextField
                id="outlined-email-input"
                placeholder="E-mail address"
                // message={this.state.formErrors.email}
                type="Email"
                variant="filled"
                label="Email"
                value={emailValue}
                onChange={(e) => getEmail(e)}
              />
              {/* <div className="validated-error">{this.state.formErrors.email}</div> */}
            </FormControl>
          </form>
          <div className="form-button-grop">
            <CustomButton
              className="login__button primary-button"
              onClick={handelSendverificationEmail}
            >
              {/* {isLoaded ? "Loading..." : "Log In" } */}
              Send Email
            </CustomButton>
          </div>
        </div>
      ) : !isWantVerificationEmail && isEmailSent ? (
        <div className="emptySection">
          <img src={sucessfullImg} />
          <Typography component="p">
            Email is sent to your registerd email. Please check and verify your
            email to login.
          </Typography>
        </div>
      ) : (
        <div className="emptySection">
          <img src={errorImg} />
          <Typography component="p">
            Somthing went wrong. Please try again!
          </Typography>
        </div>
      )}
    </div>
  );
};

export default UserVerification;
