import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Breadcrumbs } from "@material-ui/core";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Footer from "../../components/Footer";
import { Grid, Paper } from '@material-ui/core';
import ContactForm from "./contact-form";
import Map from "../../assets/images/mapDwarka.png";

const ContactUS = () => {
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
                Contact us
              </Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <Container maxWidth="lg">
          <div className="StaticPage__div">
            <Paper elevation={0}>
              <div className="StaticPage__div__container">
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__mainHeading"
                >
                  Contact US
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <div className="contact-head">
                      <div className="contact-head__text">India</div>
                      <p>409, D-21 Corporate Park, Sector 21<br />
                        Dwarka, New Delhi 110077</p>
                      <div className="contact-head__text__con-info-panel">
                        <div className="contact-head__text__con-info-panel__con-info">Phone: <a href="tel:+91 11 46109435"><span>+91 11 46109435</span></a></div>
                        <div className="contact-head__text__con-info-panel__con-info">Email: <a href="mailto:info@e2eresearch.com">info@e2eresearch.com</a></div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={6}>

                    <div className="contact-head">
                      <div className="contact-head__text">US</div>
                      <p>19 W, 34th Street Suite, 1021<br />
                        New York, NY 10001</p>
                      <div className="contact-head__text__con-info-panel">
                        <div className="contact-head__text__con-info-panel__con-info">Phone: <a href="tel:1-917-962-0521"><span>+1-917-962-0521</span></a></div>
                        <div className="contact-head__text__con-info-panel__con-info">Email: <a href="mailto:info@e2eresearch.com">info@e2eresearch.com</a></div>
                      </div>
                    </div>
                  </Grid>

                </Grid>
                <div className="Info-data">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <div className="Info-data__wrapper">
                        <p className="Info-data__wrapper__context-text">Let's Work Together</p>
                        <p>We’d love to hear from you!</p>
                      </div>
                    </Grid>
                    <Grid item xs={8}>
                      <div className="Form_container">
                        <ContactForm/>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div>
                        <p className="Info-data__wrapper__context-text">Map</p>
                        <img src={Map} alt="dummyMap" width={300} height={300} />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Paper>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUS;
