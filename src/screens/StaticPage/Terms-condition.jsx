import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Breadcrumbs } from "@material-ui/core";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const TermsCondition = () => {
  return (
    <div className="StaticPage">
      <Header />
      <div className="bredcrum-conatiner ">
        <div className="bredcrum-conatiner__bredcrum_inr">
          <Container maxWidth="lg">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="bredcrum-conatiner__bredcrum-text"
            >
              <Link color="inherit" to="/">
                Home
              </Link>
              <Typography
                color="textPrimary"
                className="bredcrum-conatiner__bredcrum-normaltext"
              >
                Terms and Condition
              </Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <Container maxWidth="xl">
          <div className="StaticPage__div">
            <Paper elevation={0}>
              <div className="StaticPage__div__container">
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__mainHeading"
                >
                  Terms and Condition
                </Typography>


                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                 Introduction
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                              <ol>
  <li>These terms and conditions shall govern your use of our website.
    <ol>
      <li className="StaticPage__div__container__discription__liStyling">By using our website, you accept these terms and conditions in full; accordingly, if you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website.</li>
      <li className="StaticPage__div__container__discription__liStyling">If you [register with our website, submit any material to our website or use any of our website services], we will ask you to expressly agree to these terms and conditions.</li>
      <li className="StaticPage__div__container__discription__liStyling">You must be at least [18] years of age to use our website; by using our website or agreeing to these terms and conditions, you warrant and represent to us that you are at least [18] years of age.</li>
      <li className="StaticPage__div__container__discription__liStyling">Our website uses cookies; by using our website or agreeing to these terms and conditions, you consent to our use of cookies in accordance with the terms of our [privacy and cookies policy].</li>
    </ol>
  </li>
  <li>Licence to use website
    <ol>
      <li>You may: 
        <ol type="a">
          <li>Except</li>
        </ol>
      </li>
      <li className="StaticPage__div__container__discription__liStyling">Except as expressly permitted BY THE provisions of these terms and conditions, you must not download any material from our website or save any such material to your computer.</li>
      <li className="StaticPage__div__container__discription__liStyling">You may only use our website for [your own personal and business purposes], and you must not use our website for any other purposes.</li>
      <li className="StaticPage__div__container__discription__liStyling">Except as expressly permitted by these terms and conditions, you must not edit or otherwise modify any material on our website.</li>
      <li className="StaticPage__div__container__discription__liStyling">Unless you own or control the relevant rights in the material, you must not:</li>
    </ol>
  </li>
  
  <li className="StaticPage__div__container__discription__liStyling">li element
    <ol>
      <li className="StaticPage__div__container__discription__liStyling">sub li element</li>
      <li className="StaticPage__div__container__discription__liStyling">sub li element</li>
      <li className="StaticPage__div__container__discription__liStyling">sub li element</li>
    </ol>
  </li>
</ol>
                </Typography>
    
              </div>
            </Paper>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TermsCondition;
