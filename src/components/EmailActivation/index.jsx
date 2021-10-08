import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import success_icon from "../../assets/images/success_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import Toaster from "../../util/Toaster";
import { BASE_URL, BASE_URL_1 } from "../../config/ApiUrl";

const EmailActivation = (EmailActive) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [emailActivationResult, setEmailActivationResult] = useState([]);

  const EmailAPI = async () => {
    dispatch(loadingStart());
    await fetch(BASE_URL + "user/account-confirm-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        key: "MTI:1mYUxq:Mg9d5nfrH3Qvy9zUPm_OplrEuhoPUCjEpz10kiviIpk",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status !== "409") {
          setEmailActivationResult(result);
          Toaster.sucess(result.details, "topCenter");
          dispatch(loadingStop());
        } else {
          setEmailActivationResult(result);
          dispatch(loadingStop());
          Toaster.error(result.details, "topCenter");
        }
      });
  };

  useEffect(() => {
    // let timeout;
    // timeout = setTimeout(() => history.push("/"), 3000);
    EmailAPI();
  }, []);
  {
    console.log("hello", emailActivationResult);
  }

  return (
    <Grid container spacing={4} align="center">
      <Grid item xs={12}>
        <div className="emailActivation">
          <img src={success_icon} alt="Registration Sucessfully" />
          <p className="sucess_message">Registration has been sucessfully</p>
        </div>
      </Grid>
    </Grid>
  );
};

export default EmailActivation;
