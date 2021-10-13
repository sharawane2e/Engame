import React, { useState, useEffect } from "react";
// import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import success_icon from "../../assets/images/success_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import Toaster from "../../util/Toaster";
import { BASE_URL, BASE_URL_1 } from "../../config/ApiUrl";

import EmailActivationSucess from "../EmailActivation/emailActivationSucess";
import Header from "../Header";
import Footer from "../Footer";
import { Container, Grid, Paper, Typography } from "@mui/material";

const EmailActivation = (EmailActive) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [emailActivationResult, setEmailActivationResult] = useState();

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
        if (result.status == "200") {
          setEmailActivationResult(true);
          Toaster.sucess("Your email is activated sucessfully", "topCenter");
          dispatch(loadingStop());
        } else {
          setEmailActivationResult(false);
          dispatch(loadingStop());
          Toaster.error("Somthing went wrong! Please try again", "topCenter");
        }
      });
  };

  useEffect(() => {
    // let timeout;
    // timeout = setTimeout(() => history.push("/"), 3000);
    EmailAPI();
  }, []);

  return (
    <>
      <Header />
      <div className="emailActivation">
        <Container maxWidth="sm" className="emailActivation__container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className="purchased-tool__tool-card card-box-shadow border--colordata border-radius emailActivation__paper">
                <div className="emailActivation__upperBlock"></div>
                <div className="emailActivation__lowerBlock"></div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default EmailActivation;
