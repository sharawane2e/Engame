import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import success_icon from "../../assets/images/success_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import Toaster from "../../util/Toaster";
import { BASE_URL, BASE_URL_1 } from "../../config/ApiUrl";
import { useLocation } from "react-router";
import { parse } from "querystring";

const EmailActivation = (EmailActive) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [emailActivationResult, setEmailActivationResult] = useState([]);

  const location = useLocation();

  const queryData = parse(location.search);

  const EmailAPI = async () => {
    dispatch(loadingStart());
    await fetch(BASE_URL + "user/account-confirm-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        key: "MTA:1mZvFm:a6v_nL9J9uKYquUn_b_SbD19d-sIOqG6k-jqFVl8eEs/",
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

    console.log(location);

    // console.log(token);
    EmailAPI();
  }, []);

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
