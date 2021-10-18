import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import CustomButton from "../widgets/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { ResetPassword } from "../../util/FormValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  BASE_URL,
  RESET_PASSWORD,
  RESET_PASSWORD_TOKEEN_VERIFY,
} from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import Toaster from "../../util/Toaster";
import emptyImg from "../../assets/images/oops.gif";
import { parse } from "query-string";
import { useLocation } from "react-router";
import { logOutUser } from "../../redux/user/user-action";
import ApiRequest from "../../util/ApiRequest";
import { useHistory } from "react-router-dom";
import EmptyPage from "../emptyPage";

const Forgot = () => {
  const dispatch = useDispatch();
  const [newPasswords, setNewPasswords] = useState("");
  const [conformPasswords, setConformPasswords] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isToken, setIsToken] = useState(false);
  const [isPasswordResetSucessfully, setIsPasswordResetSucessfully] =
    useState(false);
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
        setIsPasswordResetSucessfully(true);
      });
    }
  };

  const CheckToken = () => {
    let verifyTokenData = {
      uid: queryData.uid,
      token: queryData.token,
    };

    ApiRequest.request(RESET_PASSWORD_TOKEEN_VERIFY, "POST", verifyTokenData)
      .then((res) => {
        console.log(res);
        if (res.status !== "False") {
          setIsToken(true);
        } else {
          setIsToken(false);
        }
      })
      .catch((error) => {
        setIsToken(false);
        dispatch(logOutUser());
        localStorage.removeItem("auth");
        dispatch(loadingStop());
        history.push("/");
      });
  };

  useEffect(() => {
    CheckToken();
  }, []);

  return (
    <>
      <Header />
      <div className="forgot">
        {!isToken && !isPasswordResetSucessfully ? (
          <EmptyPage
            heading="Somthing went wrong! Please try again"
            buttonName="Back to home"
            imgUrl={emptyImg}
          />
        ) : isToken && !isPasswordResetSucessfully ? (
          <form action="">
            <div className="form-group">
              <InputLabel
                htmlFor="standard-adornment-email"
                className="input-label"
              >
                Password
              </InputLabel>
              <FormControl className="form-area__control">
                <TextField
                  id="outlined-email-input"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  onChange={haldelNewPassword}
                />
                <div className="validated-error"></div>
              </FormControl>

              <InputLabel
                htmlFor="standard-adornment-email"
                className="input-label"
              >
                Confirm Password
              </InputLabel>
              <FormControl className="form-area__control">
                <TextField
                  id="outlined-email-input"
                  placeholder="Confrim Password"
                  type="password"
                  variant="outlined"
                  onChange={haldelConformPassword}
                  onKeyUp={handelMatchPassword}
                />
                <div className="validated-error"></div>
              </FormControl>
              <p>
                {!passwordMatch ? "password you are entered is incurrect" : ""}
              </p>
            </div>
            <div className="form-group">
              <CustomButton
                className="forgot__button primary-button"
                onClick={ResetPassword}
              >
                Submit
              </CustomButton>
            </div>
          </form>
        ) : isPasswordResetSucessfully ? (
          <EmptyPage
            heading="Password has been changed sucessfully!"
            buttonName="Back to home"
            imgUrl={emptyImg}
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
