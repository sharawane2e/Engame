import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import CustomButton from "../widgets/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_PASSWORD,
  RESET_PASSWORD_TOKEEN_VERIFY,
} from "../../config/ApiUrl";
import { loadingStop } from "../../redux/loader/loader-actions";
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
import BlankSection from "../emptyPage/blankSection";
import { Message } from "@mui/icons-material";

const Forgot = () => {
  const dispatch = useDispatch();
  const [newPasswords, setNewPasswords] = useState("");
  const [conformPasswords, setConformPasswords] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [isToken, setIsToken] = useState(false);
  const [isPasswordResetSucessfully, setIsPasswordResetSucessfully] =
    useState(false);
  const [isPageRendring, setIsPageRendring] = useState(true);

  const location = useLocation();
  const history = useHistory();
  const queryData = parse(location.search);

  const haldelNewPassword = (e) => {
    setNewPasswords(e.target.value);
  };

  const haldelConformPassword = (e) => {
    setConformPasswords(e.target.value);
  };
  const handelMatchPassword = () => {
    newPasswords === conformPasswords
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  };

  const ResetPassword = () => {
    // console.log(passwordMatch, "Password match");
    if (passwordMatch) {
      let resetPasswordVal = {
        new_password1: newPasswords,
        new_password2: conformPasswords,
        token: queryData.token,
        uid: queryData.uid,
      };
      ApiRequest.request(
        RESET_PASSWORD + queryData.uid + "/" + queryData.token + "/",
        "POST",
        resetPasswordVal
      ).then((res) => {
        if (res.status) {
          setIsPasswordResetSucessfully(true);
          setIsToken(false);
        } else {
          setIsPasswordResetSucessfully(false);
          setIsToken(true);
          Toaster.error(res.detail.message, "top-center");
        }
      });
    }
  };

  const CheckToken = () => {
    let verifyTokenData = {
      uid: queryData.uid,
      token: queryData.token,
    };

    // console.log("Check token");

    ApiRequest.request(RESET_PASSWORD_TOKEEN_VERIFY, "POST", verifyTokenData)
      .then((res) => {
        // console.log(res, "token verify");
        if (res.status) {
          setIsToken(true);
          setIsPasswordResetSucessfully(false);
        } else {
          setIsToken(false);
          setIsPasswordResetSucessfully(false);
        }
      })
      .finally(() => {
        setIsPageRendring(false);
      });
  };

  useEffect(() => {
    CheckToken();
  }, [queryData.token]);

  return (
    <>
      <Header />
      <div className="forgot">
        {isPageRendring ? (
          <BlankSection />
        ) : isToken && !isPasswordResetSucessfully ? (
          <div className="form-area forgot__section">
            <div className="form-area__login  large-hedding">
              Reset Password
            </div>
            <form action="">
              <div className="form-group">
                <FormControl className="form-area__control">
                  <TextField
                    id="outlined-email-input"
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    onChange={haldelNewPassword}
                    label="Password"
                  />
                  <div className="validated-error"></div>
                </FormControl>
                <FormControl className="form-area__control">
                  <TextField
                    id="outlined-email-input"
                    placeholder="Confrim Password"
                    type="password"
                    onChange={haldelConformPassword}
                    onKeyUp={handelMatchPassword}
                    variant="outlined"
                    label="Confirm Password"
                  />
                  <div className="validated-error">
                    {!passwordMatch ? ErrorMessages.PASSWORD_MATCH : ""}
                  </div>
                </FormControl>
              </div>
              <div className="form-button-grop">
                <CustomButton
                  className="custom-button login__button primary-button"
                  onClick={ResetPassword}
                >
                  Submit
                </CustomButton>
              </div>
            </form>
          </div>
        ) : !isToken && !isPasswordResetSucessfully ? (
          <EmptyPage
            heading={ErrorMessages.PASSWORD_CANNOT_CHANGE}
            buttonName="Back to home"
            imgUrl={emptyImg}
          />
        ) : isPasswordResetSucessfully ? (
          <EmptyPage
            heading={ErrorMessages.PASSWORD_CHANGE_SUCESSFULLY}
            buttonName="Back to home"
            imgUrl={sucessfullImg}
          />
        ) : (
          ""
        )}
      </div>

      <Footer />
    </>
  );
};

export default Forgot;
