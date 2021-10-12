import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import CustomButton from "../../components/widgets/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { ResetPassword } from "../../util/FormValidation";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import Toaster from "../../util/Toaster";
import { CheckCircleIcon } from "../../assets/images/check-circle.svg";
import { parse } from "query-string";
import { useLocation } from "react-router";

const Forgot = () => {
  const dispatch = useDispatch();
  const [newPasswords, setNewPasswords] = useState("");
  const [conformPasswords, setConformPasswords] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    // console.log(queryData);
  }, []);

  // handleSubmit
  const handleSubmit = () => {
    console.log("passwoird", newPasswords);
    console.log("conform password", conformPasswords);

    // const validationResponses = ResetPassword.validateForm({
    //   newPasswords,
    //   conformPasswords,
    // });

    dispatch(loadingStart());
    fetch(
      BASE_URL +
        "user/password/reset/confirm/" +
        queryData.uid +
        "/" +
        queryData.token +
        "/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password1: newPasswords,
          new_password2: conformPasswords,
          uid: queryData.uid,
          token: queryData.token,
        }),
      }
    )
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        Toaster.error("Sucess");
        setIsPasswordReset(true);
        dispatch(loadingStop());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      {!isToken ? (
        <div className="forgot">
          {!isPasswordReset ? (
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
                  {!passwordMatch
                    ? "password you are entered is incurrect"
                    : ""}
                </p>
              </div>
              <div className="form-group">
                <CustomButton
                  className="forgot__button primary-button"
                  onClick={handleSubmit}
                >
                  Submit
                </CustomButton>
              </div>
            </form>
          ) : (
            <div>
              <h2>Password Reset sucessfully</h2>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Somthing Went wrong please try again</h2>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Forgot;
