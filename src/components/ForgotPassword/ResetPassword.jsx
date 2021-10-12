import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import CustomButton from "../widgets/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { ResetPassword } from "../../util/FormValidation";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import Toaster from "../../util/Toaster";
import { CheckCircleIcon } from "../../assets/images/check-circle.svg";

const Forgot = () => {
  const dispatch = useDispatch();
  const [newPasswords, setNewPasswords] = useState("");
  const [conformPasswords, setConformPasswords] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {}, []);

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

  // handleSubmit
  const handleSubmit = () => {
    let uuid = window.location.hash.split("forgot/")[1];

    let onlyuuid = uuid.split("/")[0];
    let token = uuid.split("/")[1];
    console.log("passwoird", newPasswords);
    console.log("conform password", conformPasswords);

    // const validationResponses = ResetPassword.validateForm({
    //   newPasswords,
    //   conformPasswords,
    // });

    dispatch(loadingStart());
    fetch(
      BASE_URL + "user/password/reset/confirm/" + onlyuuid + "/" + token + "/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password1: newPasswords,
          new_password2: conformPasswords,
          uid: onlyuuid,
          token: token,
        }),
      }
    )
      .then((result) => result.json())
      .then((data) => {
        Toaster.error(
          data.non_field_errors ? data.non_field_errors.join("") : null,
          "topCenter"
        );
        console.log(data);
        dispatch(loadingStop());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <div className="forgot">
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
              onClick={handleSubmit}
            >
              Submit
            </CustomButton>
          </div>
        </form>
        <div>{/* <img src={CheckCircleIcon} alt="success" /> */}</div>
      </div>

      <Footer />
    </>
  );
};

export default Forgot;
